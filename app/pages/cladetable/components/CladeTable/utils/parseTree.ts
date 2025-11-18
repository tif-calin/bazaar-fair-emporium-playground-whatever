import { countLeaves, findDepth } from "~/pages/cladetable/utils/graphs";
import type { NewickNode } from "~/pages/cladetable/utils/parseNewick.js";
import type { CladeTableData } from "../types";

let id = 0;
const nodeToId = new Map<NewickNode, string>();
const parseTree = (
  node: NewickNode,
  { nodes, edges }: CladeTableData = { nodes: {}, edges: {} }
) => {
  if (!nodeToId.has(node)) nodeToId.set(node, `node:${id++}`);

  const nodeId = nodeToId.get(node)!;
  nodes[nodeId] = {
    id: nodeId,
    label: node.name,
    depth: findDepth(node),
    leafCount: countLeaves(node),
  };

  node.children?.forEach((child) => {
    const edgeId = `edge:${id++}`;
    edges[edgeId] = { id: edgeId, source: nodeId, target: parseTree(child, { nodes, edges })[0] };
  });

  return [nodeId, { nodes, edges }] as const;
};

export default parseTree;
