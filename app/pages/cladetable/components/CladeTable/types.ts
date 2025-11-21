import type { ReactNode } from "react";

export type CladeTableNode = {
  id: string;
  label?: string;
  data?: Record<string, ReactNode>;

  /** TODO: move this to ParsedNode ~culi */
  depth: number;
  /** TODO: move this to ParsedNode ~culi */
  leafCount: number;
};

export type CladeTableEdge = {
  id: string;
  source: CladeTableNode["id"];
  target: CladeTableNode["id"];
};

type CladeTableColumns = {
  key: string;
  label?: string;
  onRender?: (node: CladeTableNode) => ReactNode;
};

export type CladeTableData = {
  columns: CladeTableColumns[];
  nodes: Record<string, CladeTableNode>;
  edges: Record<string, CladeTableEdge>;
};
