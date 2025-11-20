import { countLeaves, findDepth } from "~/pages/cladetable/utils/graphs";
import type { NewickNode } from "~/pages/cladetable/utils/parseNewick.js";
import type { CladeTableData } from "../types";

let id = 0;
const nodeToId = new Map<NewickNode, string>();
/**
 * Parses a NewickNode (resulting from the `parseNewick` util) to flatten the tree into a collection
 * of nodes and edges that the `CladeTable` component can render.
 */
const parseTreeForCladeTable = (
  node: NewickNode,
  { nodes, edges }: Pick<CladeTableData, "nodes" | "edges"> = { nodes: {}, edges: {} }
) => {
  if (!nodeToId.has(node)) nodeToId.set(node, `node:${id++}`);

  const nodeId = nodeToId.get(node)!;
  nodes[nodeId] = {
    id: nodeId,
    ...node,
    label: node.name,
    depth: findDepth(node),
    leafCount: countLeaves(node),
  };

  node.children?.forEach((child) => {
    const edgeId = `edge:${id++}`;
    edges[edgeId] = {
      id: edgeId,
      source: nodeId,
      target: parseTreeForCladeTable(child, { nodes, edges })[0],
    };
  });

  return [nodeId, { nodes, edges }] as const;
};

export default parseTreeForCladeTable;
