import React from "react";
import type { CladeTableEdge, CladeTableNode } from "./types";

interface Props {
  parsedNodes: Record<CladeTableNode["id"], CladeTableNode & { x: number; y: number }>;
  parsedEdges: Record<CladeTableEdge["id"], CladeTableEdge>;
}

const drawEdgePath = (sourceX: number, sourceY: number, targetX: number, targetY: number) => {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const crv = 2;

  let upOrDown = dy > 0 ? 1 : -1;
  if (!dy) upOrDown = 0;

  return `
    M ${sourceX} ${sourceY}
    h 2
    s 2 0 2 ${upOrDown * crv}
    v ${dy + crv * 2 * -upOrDown}
    s 0 ${upOrDown * crv} 2 ${upOrDown * crv}
    h ${dx - crv * 3}
  `;
};

const Plot = ({ parsedNodes, parsedEdges }: Props) => {
  return (
    <g className="plot">
      <g className="edges">
        {Object.values(parsedEdges).map((edge) => {
          const { source, target } = edge;

          return (
            <path
              key={edge.id}
              fill="none"
              stroke="var(--clr-line)"
              d={drawEdgePath(
                parsedNodes[source].x,
                parsedNodes[source].y,
                parsedNodes[target].x,
                parsedNodes[target].y
              )}
            />
          );
        })}
      </g>

      <g className="nodes">
        {Object.values(parsedNodes).map((node) => {
          const isLeafNode = node.depth === 1;

          return (
            <g className="node" key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle r={1.5} />
              {isLeafNode && (
                <text dy="0.25em" dx="0.5em">
                  {node.id}
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
