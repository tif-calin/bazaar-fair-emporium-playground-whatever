import { parseNewick } from '~/pages/cladetable/utils/newick';
import { getPopularityList } from './onezoom';
import { getInducedSubtree, getLineage, getResolvedName } from './opentree';
import { getWikiData } from './wikidata';
import { prepareOtolNewickTree } from '../../PhylogeneticCladeTable/utils/prepareNewickTree';
import parseNewickNodeForCladeTable from '../../CladeTable/utils/parseNewickNodeForCladeTable';
import { sum } from '~/utils/numbers';
import { unparseCsv } from '~/pages/cladetable/utils/csv';

const constructRelatednessRanking = async (parentOttId: string, locusOttId: string) => {
  const newickTree = await getLineage(`ott${parentOttId}`, { format: 'newick' });
  if (!newickTree || !('newick' in newickTree)) throw new Error('No newick tree found');

  const newickTreeJson = parseNewick(newickTree.newick);
  prepareOtolNewickTree(newickTreeJson);

  const [_, { nodes }] = parseNewickNodeForCladeTable(newickTreeJson);
  const locusNode = Object.values(nodes).find(node => node.data?.ottId === locusOttId);
  if (!locusNode) throw new Error('No locus node found');
  const locusLineage = (locusNode.lineage as string[]).toReversed();
  const relatednessList = Object.values(nodes)
    .toSorted((a, b) => a.depth - b.depth)
    .filter(node => node.depth === 1)
    .map(node => {
      const currLineage = new Set(node.lineage as string[]);
      const distanceFromLocus = locusLineage.findIndex(ancestor => currLineage.has(ancestor));

      return { ...node, distanceFromLocus };
    })
    .toSorted((a, b) => a.distanceFromLocus - b.distanceFromLocus);

  console.log('constructRelatednessRanking', {
    parentOttId,
    newickTree,
    newickTreeJson,
    locusNode,
    relatednessList,
  });

  return relatednessList;
};

type Opts = {
  /**
   * Not counting the locus node.
   *
   * @default 15
   */
  finalLeafCount: number;
  oneZoomApiKey: string;
  /**
   * For the default api key, the maximum is 100. More than that will error.
   *
   * @default 100
   */
  oneZoomMaxQuery: number;
};

/**
 * This calls several APIs in order to construct a tree based on a locus node. In order to construct
 * this "induced tree", we try to find some closely related species that are also "well known"
 * (assessed by their Wikipedia page hit count). We select a number of these species and then
 * construct the minimal tree that contains these leaf nodes.
 */
export const orchestrateInducedTree = async (latinName: string, opts: Partial<Opts>) => {
  opts.finalLeafCount ||= 15;
  opts.oneZoomApiKey ||= '0';
  opts.oneZoomMaxQuery ||= 100;

  const wikidataIds = await getWikiData(latinName);
  let ottid = wikidataIds.identifiers.find(({ propertyId }) => propertyId === 'P9157')?.id;
  if (!ottid) {
    console.warn('No OTT ID found');
    const ottResolution = await getResolvedName(latinName);
    ottid = ottResolution?.at(0)?.['ott_id']?.toString();
  }
  if (!ottid) throw new Error('No OTT ID found');

  const opentreeData = await getLineage(`ott${ottid}`);
  if (!opentreeData || !('arguson' in opentreeData)) throw new Error('No arguson data found');

  // find parent with at least X tips
  const parent = opentreeData.arguson.lineage
    .slice()
    .toSorted((a, b) => a.num_tips - b.num_tips)
    .find(node => node.num_tips >= 200 && !!node.taxon);
  if (!parent) throw new Error('No parent found');
  const parentOttId = parent.node_id.replaceAll(/^ott/g, '');

  const relatednessList = await constructRelatednessRanking(parentOttId, ottid);

  const ottIds = [parentOttId, ottid];
  const popularityList = await getPopularityList(ottIds, { key: opts.oneZoomApiKey, max: 3270 });
  if (!popularityList) throw new Error('No popularity list found');

  const popularityValues = popularityList.data
    .map(node => node[3] || 0)
    .toSorted((a, b) => Number(a) - Number(b));
  const percentile85 = popularityValues[Math.floor(popularityValues.length * 0.85)];
  const averagePopularity = sum(popularityValues) / popularityValues.length;
  const popularityThreshold = (percentile85 + averagePopularity) / 2;
  const popularKids: Record<string, number> = {};
  for (const node of relatednessList) {
    const currOttId = node.data?.ottId?.toString();
    if (!currOttId) throw new Error('No OTT ID found for this node');
    const popularity = popularityList.data.find(([ottId]) => ottId.toString() === currOttId)?.[3];

    if (`${currOttId}` === ottid) popularKids[currOttId] = popularity || 0;
    if (Object.keys(popularKids).length >= opts.finalLeafCount || !popularity) continue;
    if (popularity > popularityThreshold) popularKids[currOttId] = popularity;
  }

  const inducedNewick = await getInducedSubtree([ottid, ...Object.keys(popularKids)]);
  if (!inducedNewick || !('newick' in inducedNewick)) throw new Error('No induced newick found');

  const csv = unparseCsv([
    ['id', 'ottId', 'popularity'],
    ...Object.entries(popularKids).map(row => {
      const nodeId = relatednessList.find(node => node.data?.ottId === row[0])?.id;
      if (!nodeId) throw new Error('No node ID found');

      return [`${nodeId}`, ...row] as string[];
    }),
  ]);

  console.log('orchestrateInducedTree', {
    wikidataIds,
    opentreeData,
    parent,
    popularityList,
    popularityThreshold,
    popularKids,
    inducedNewick,
    csv,
  });

  return { ...inducedNewick, csv };
};
