import React from "react";
import type { CladeTableEdge, CladeTableNode } from "./types";

interface Props {
  parsedNodes: Record<CladeTableNode["id"], CladeTableNode & { x: number; y: number }>;
  parsedEdges: Record<CladeTableEdge["id"], CladeTableEdge>;
}

const Plot = ({ parsedNodes, parsedEdges }: Props) => {
  return (
    <g className="plot">
      <g className="edges">
        {Object.values(parsedEdges).map((edge) => {
          const { source, target } = edge;

          return (
            <line
              key={edge.id}
              stroke="black"
              x1={parsedNodes[source].x}
              y1={parsedNodes[source].y}
              x2={parsedNodes[target].x}
              y2={parsedNodes[target].y}
            />
          );
        })}
      </g>

      <g className="nodes">
        {Object.values(parsedNodes).map((node) => {
          const isLeafNode = node.depth === 1;

          return (
            <g className="node" key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle r={2} />
              {isLeafNode && (
                <text dy="0.25em" dx="0.5em">
                  {node.label || node.id}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export default React.memo(Plot);
