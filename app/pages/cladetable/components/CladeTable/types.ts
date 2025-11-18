export type CladeTableNode = {
  id: string;
  label?: string;

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

export type CladeTableData = {
  nodes: Record<string, CladeTableNode>;
  edges: Record<string, CladeTableEdge>;
};
