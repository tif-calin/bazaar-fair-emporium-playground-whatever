import { countLeaves, findDepth } from '~/pages/cladetable/utils/graphs';
import type { NewickNode } from '~/pages/cladetable/utils/newick.js';
import type { CladeTableData } from '../types';
import type { ReactNode } from 'react';

let id = 0;
const NODE_TO_ID = new Map<NewickNode, string>();

/**
 * Parses a NewickNode (resulting from the `parseNewick` util) to flatten the tree into a collection
 * of nodes and edges that the `CladeTable` component can render.
 */
const parseNewickNodeForCladeTable = <T extends Record<string, ReactNode>>(
  node: NewickNode<T>,
  { nodes, edges }: Pick<CladeTableData<T>, 'nodes' | 'edges'> = {
    nodes: {},
    edges: {},
  },
  lineage: string[] = []
) => {
  if (!node) return ['', { nodes, edges }] as const;

  // let nodeId = `${node.name || `node:${id++}`}`;
  // if (!NODE_TO_ID.has(node)) NODE_TO_ID.set(node, nodeId);
  // nodeId = NODE_TO_ID.get(node)!;

  if (!NODE_TO_ID.has(node)) NODE_TO_ID.set(node, `node:${id++}`);
  const nodeId = NODE_TO_ID.get(node)!;

  nodes[nodeId] = {
    id: nodeId,
    ...node,
    depth: findDepth(node),
    label: node.name,
    leafCount: countLeaves(node),
    lineage,
  };

  node.children?.forEach(child => {
    const edgeId = `edge:${id++}`;
    edges[edgeId] = {
      id: edgeId,
      source: nodeId,
      target: parseNewickNodeForCladeTable(child, { nodes, edges }, [...lineage, nodeId])[0],
    };
  });

  return [nodeId, { nodes, edges }] as const;
};

export default parseNewickNodeForCladeTable;
