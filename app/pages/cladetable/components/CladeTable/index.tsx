import React, { useId } from "react";
import { styled } from "@linaria/react";
import type { CladeTableData } from "./types";
import { mapObject } from "~/utils/object";
import Plot from "./Plot";

interface Props {
  data: CladeTableData;
  id: string;
  title: string;
}

const VizContainer = styled.div<{
  cladogramWidth: number;
}>`
  display: flex;

  & td:has(> svg.cladogram) {
    border: 1px dashed var(--clr-line);
    min-width: ${(props) => props.cladogramWidth}px;
  }

  & svg.cladogram {
    position: relative;

    & .node {
      fill: var(--clr-txt);
    }

    & .edges path {
      fill: none;
    }
  }

  & > table {
    & thead td {
      background-color: var(--clr-bg);
      font-weight: 500;
      text-align: center;
      white-space: nowrap;

      &:first-child {
        background-color: unset;
      }
    }

    & td {
      padding: 0 0.25rem;
    }
  }
`;

const CLADE_NODE_DISTANCE = 7;

const CladeTable = (props: Props) => {
  const { data } = props;

  const id = useId();

  const treeDepth = Math.max(...Object.values(data.nodes).map((node) => node.depth));
  const vizWidth = (treeDepth + 0.5) * CLADE_NODE_DISTANCE;
  const leafCount = Math.max(...Object.values(data.nodes).map((node) => node.leafCount));
  const vizHeight = leafCount * 30;

  const { parsedNodes, parsedEdges } = React.useMemo(() => {
    const nodeYLevels: Record<number, number> = {};

    // TODO: make edges grouped by source ~culi

    // assign initial x,y for leaf nodes
    const parsedNodes = mapObject(data.nodes, (nodeId, node) => {
      nodeYLevels[node.depth] ||= 0;
      nodeYLevels[node.depth]++;

      const y = (nodeYLevels[node.depth] - 0.5) * 30;
      const x = treeDepth * CLADE_NODE_DISTANCE;

      const outgoingEdges = Object.values(data.edges).filter((edge) => edge.source === nodeId);

      return [nodeId, { ...node, x, y, outgoingEdges }] as const;
    });

    // assign initial x,y for parent nodes
    Object.values(parsedNodes)
      .filter((node) => node.depth > 1)
      .sort((a, b) => a.depth - b.depth)
      .forEach((node) => {
        const outgoingYs = node.outgoingEdges.map((edge) => parsedNodes[edge.target].y);

        parsedNodes[node.id] = {
          ...node,
          x: (treeDepth - node.depth + 0.5) * CLADE_NODE_DISTANCE,
          y: (Math.max(...outgoingYs) + Math.min(...outgoingYs)) / 2,
        };
      });

    return {
      parsedNodes,
      parsedEdges: data.edges,
    };
  }, [data.edges, data.nodes, treeDepth]); // TODO fix eslint hooks warning!

  const leafNodes = Object.values(parsedNodes).filter((node) => node.depth === 1);

  return (
    <VizContainer cladogramWidth={vizWidth}>
      <table>
        <thead>
          <tr>
            <td></td>
            {data.columns.map((col) => (
              <td key={col.key}>{col.label || col.key}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={leafCount}>
              <svg
                className="cladogram"
                id={id}
                width={vizWidth}
                viewBox={`0 0 ${vizWidth} ${vizHeight}`}
              >
                <Plot parsedNodes={parsedNodes} parsedEdges={parsedEdges} />
              </svg>
            </td>
            {data.columns.map((col) => (
              <td key={col.key}>{leafNodes[0].data?.[col.key] || "N/A"}</td>
            ))}
          </tr>
          {leafNodes.slice(1).map((node) => (
            <tr key={node.id}>
              {data.columns.map((col) => (
                <td key={col.key}>{node.data?.[col.key] || "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </VizContainer>
  );
};

export default React.memo(CladeTable);
