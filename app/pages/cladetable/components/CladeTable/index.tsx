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

const VizContainer = styled.div`
  display: flex;

  & > svg.cladogram {
    border: 1px dashed var(--clr-line);

    & .node {
      fill: var(--clr-txt);

      & text {
      }
    }
  }
`;

const StyledTable = styled.div<{
  height: number;
}>`
  /* border: 1px solid var(--clr-line); */
  flex-grow: 1;

  & > table {
    height: ${(props) => props.height}px;
  }
`;

const CLADE_NODE_DISTANCE = 7;

const CladeTable = (props: Props) => {
  const { data } = props;

  const id = useId();

  const treeDepth = Math.max(...Object.values(data.nodes).map((node) => node.depth));
  const vizWidth = treeDepth * CLADE_NODE_DISTANCE + 150;
  const leafCount = Math.max(...Object.values(data.nodes).map((node) => node.leafCount));
  const vizHeight = leafCount * 30;

  const { parsedNodes, parsedEdges } = React.useMemo(() => {
    const nodeYLevels: Record<number, number> = {};

    // TODO: make edges grouped by source ~culi

    // assign initial x,y for leaf nodes
    const parsedNodes = mapObject(data.nodes, (nodeId, node, i) => {
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
          // x: ((treeDepth - node.depth + 0.5) / treeDepth) * (treeDepth * 10),
          x: (treeDepth - node.depth + 0.5) * CLADE_NODE_DISTANCE,
          y: (Math.max(...outgoingYs) + Math.min(...outgoingYs)) / 2,
        };
      });

    // Object.values(data.edges).forEach(edge => {
    //   const { source, target } = edge;
    // });

    return {
      parsedNodes,
      parsedEdges: data.edges,
    };
  }, []);

  return (
    <VizContainer>
      <svg className="cladogram" id={id} width={vizWidth} viewBox={`0 0 ${vizWidth} ${vizHeight}`}>
        <Plot parsedNodes={parsedNodes} parsedEdges={parsedEdges} />
      </svg>

      <StyledTable height={vizHeight} className="table">
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </tbody>
        </table>
      </StyledTable>
    </VizContainer>
  );
};

export default React.memo(CladeTable);
