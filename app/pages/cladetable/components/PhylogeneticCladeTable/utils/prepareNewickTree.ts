import { parseNewick, unparseNewick, type NewickNode } from '~/pages/cladetable/utils/newick';

const RE_OTT_NODE_NAME = /^(?<genus>[A-Za-z-]+)_(?<speciesEpitaph>[A-Za-z-]+)_ott(?<ottId>\d+)$/;

/**
 * Takes the ouput of `parseNewick` and prepares it for the `PhylogeneticCladeTable` component by:
 * - pruning the tree so that leaf nodes are only at the species level (no subspecies or varieties)
 * - setting the `id`
 * - formatting the latin name and ott id.
 *
 * > [!WARNING]
 * > This function works in-place and mutates the input.
 */
const prepareNewickTree = (node: NewickNode) => {
  let treeDoesContainDesiredLeaf = false;

  if (node.name) {
    const match = RE_OTT_NODE_NAME.exec(node.name);
    if (match) {
      treeDoesContainDesiredLeaf = true;

      const { genus, speciesEpitaph, ottId } = match.groups!;
      const latinName = `${genus} ${speciesEpitaph}`;
      node.data = { genus, latinName, ottId, speciesEpitaph, ...node.data };
    }
  }

  if (node.children) node.children = node.children.filter(child => prepareNewickTree(child));
  if (node.children?.length) treeDoesContainDesiredLeaf = true;

  return treeDoesContainDesiredLeaf;
};

export const prepareFromString = (newick: string) => {
  const rootNode = parseNewick(newick);
  prepareNewickTree(rootNode);

  return unparseNewick(rootNode);
};

export default prepareNewickTree;
