import { getPopularityList } from "./onezoom";
import { getInducedSubtree, getLineage } from "./opentree";
import { getWikiData } from "./wikidata";

// 1. find first parent with over 200 tips
// 2. get the newick for that parent
// 3. construct 2 rankings: one based on popularity and one based on relatedness
// 4. choose [20?] children based on relatedness and popularity

export const orchestrateInducedTree = async (latinName: string, oneZoomApiKey?: string) => {
  const wikidataIds = await getWikiData(latinName);

  const ottid = wikidataIds.identifiers.find(({ propertyId }) => propertyId === "P9157")?.id;
  // TODO: if wikidata doesn't have it, use opentree's name resolution
  if (!ottid) throw new Error("No OTT ID found");

  const opentreeData = await getLineage(`ott${ottid}`);
  if (!opentreeData || !("arguson" in opentreeData)) throw new Error("No arguson data found");

  // find parent with at least X tips
  const parent = opentreeData.arguson.lineage
    .slice()
    .toSorted((a, b) => a.num_tips - b.num_tips)
    .find((node) => node.num_tips >= 50 && !!node.taxon);
  if (!parent) throw new Error("No parent found");

  const ottIds = [parent.node_id.replaceAll(/^ott/g, ""), ottid];
  const popularityList = await getPopularityList(ottIds, { key: oneZoomApiKey, max: 3270 });
  if (!popularityList) throw new Error("No popularity list found");

  const popularKids: Record<string, number> = {};
  for (const [currOttId, _p, _r, raw] of popularityList.data) {
    if (!raw) continue;

    if (Object.keys(popularKids).length >= 20) continue;
    if (raw > 100 || `${currOttId}` === ottid) {
      popularKids[currOttId] = raw;
    }
  }

  const inducedNewick = await getInducedSubtree([ottid, ...Object.keys(popularKids)]);
  if (!inducedNewick || !("newick" in inducedNewick)) throw new Error("No induced newick found");

  console.log({ wikidataIds, opentreeData, parent, popularityList, popularKids, inducedNewick });

  // TODO: trim the tree

  return inducedNewick;
};
