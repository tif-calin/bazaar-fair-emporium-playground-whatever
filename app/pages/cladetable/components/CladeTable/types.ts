import type { ReactNode } from 'react';

export type CladeTableNode<T extends Record<string, ReactNode> = Record<string, ReactNode>> = {
  /** Must be unique. */
  id: string;
  /** Newick node labels are optional so they cannot serve as unique ids. */
  label?: string;
  /** Arbitrary data depending on implementation. */
  data?: T;

  //== TODO: move theses to ParsedNode ~culi ==\\

  /** How many generations from the root node. */
  depth: number;
  /** Number of leaf nodes in this node's subtree. */
  leafCount: number;
  /** The node.id of every ancestor of this node. First element is the root node. */
  lineage: string[];
};

export type CladeTableEdge = {
  id: string;
  source: CladeTableNode['id'];
  target: CladeTableNode['id'];
};

type CladeTableColumns<T extends Record<string, ReactNode>> = {
  key: keyof T & string;
  label?: ReactNode;
  onRender?: (node: CladeTableNode<T>) => ReactNode;
};

export type CladeTableData<T extends Record<string, ReactNode> = Record<string, ReactNode>> = {
  columns: CladeTableColumns<T>[];
  nodes: Record<string, CladeTableNode<T>>;
  edges: Record<string, CladeTableEdge>;
};
