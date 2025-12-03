import type { ReactNode } from 'react';

type DefaultNodeData = Record<string, ReactNode>;

export type CladeTableNode<T extends DefaultNodeData = DefaultNodeData> = {
  id: string;
  label?: string;
  data?: T;

  /** TODO: move this to ParsedNode ~culi */
  depth: number;
  /** TODO: move this to ParsedNode ~culi */
  leafCount: number;
};

export type CladeTableEdge = {
  id: string;
  source: CladeTableNode['id'];
  target: CladeTableNode['id'];
};

type CladeTableColumns<T extends DefaultNodeData> = {
  key: keyof T & string;
  label?: string;
  onRender?: (node: CladeTableNode<T>) => ReactNode;
};

export type CladeTableData<T extends DefaultNodeData> = {
  columns: CladeTableColumns<T>[];
  nodes: Record<string, CladeTableNode<T>>;
  edges: Record<string, CladeTableEdge>;
};
