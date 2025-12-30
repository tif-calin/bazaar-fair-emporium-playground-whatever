import React, { type ReactNode } from 'react';
import { styled } from '@linaria/react';
import type { CladeTableData } from './types';
import { mapObject } from '~/utils/object';
import Plot from './Plot';
import useResizeObserver from '~/utils/useResizeObserver';
import { sum } from '~/utils/numbers';
import { groupByKey } from '~/utils/collections';

interface Props<T extends Record<string, ReactNode> = Record<string, ReactNode>> {
  data: CladeTableData<T>;
  id: string;
  title: string;
}

const Container = styled.div<{
  cladogramWidth: number;
}>`
  padding: 2px 0;

  & :where(& > table) {
    line-height: 1;
    white-space: nowrap;

    & td {
      vertical-align: middle;
    }

    & td:has(> svg.cladogram) {
      border-right: 1px dashed var(--clr-line);
      min-width: ${props => props.cladogramWidth}px;
    }

    & thead td:not(:empty) {
      background-color: var(--clr-bg);
      border: 1px solid var(--clr-line);
      font-weight: 500;
      text-align: center;
    }

    & tbody {
      & td {
        border-right: 1px dashed var(--clr-line);
      }

      & tr {
        position: relative;

        &:nth-child(2n) {
          background: rgb(from var(--clr-txt) r g b / 0.075);
        }
      }
    }
  }
`;

const CLADE_NODE_DISTANCE = 7;

const CladeTable = <T extends Record<string, ReactNode> = Record<string, ReactNode>>(
  props: Props<T>
) => {
  const { data } = props;
  const opts = {
    defaultRowHeight: 20,
  };
  const svgId = React.useId();

  const [leafNodeRowHeights, setLeafNodeRowHeights] = React.useState<number[]>([]);

  const treeDepth = Math.max(...Object.values(data.nodes).map(node => node.depth));
  const vizWidth = (treeDepth + 0.5) * CLADE_NODE_DISTANCE;
  const leafCount = Math.max(...Object.values(data.nodes).map(node => node.leafCount));
  const vizHeight = sum(leafNodeRowHeights) || leafCount * opts.defaultRowHeight;

  const { parsedNodes, parsedEdges } = React.useMemo(() => {
    const edgesBySource = groupByKey(Object.values(data.edges), 'source');
    const nodeYLevels: Record<number, number> = {};
    const parsedNodes = mapObject(data.nodes, (nodeId, node) => {
      nodeYLevels[node.depth] ||= 0;
      nodeYLevels[node.depth]++;

      let y = (nodeYLevels[node.depth] - 0.5) * opts.defaultRowHeight;
      if (node.leafCount === 1) {
        const currRowHeight = leafNodeRowHeights[nodeYLevels[node.depth] - 1];
        const cumulativeRowHeight = sum(leafNodeRowHeights.slice(0, nodeYLevels[node.depth]));
        y = cumulativeRowHeight - currRowHeight / 2 || y;
      }

      const x = treeDepth * CLADE_NODE_DISTANCE;
      const outgoingEdges = edgesBySource[nodeId];

      return [nodeId, { ...node, x, y, outgoingEdges }] as const;
    });

    // Assign y coordinate for parent nodes.
    Object.values(parsedNodes)
      .filter(node => node.depth > 1)
      .toSorted((a, b) => a.depth - b.depth)
      .forEach(node => {
        const outgoingYs = node.outgoingEdges.map(edge => parsedNodes[edge.target].y);

        parsedNodes[node.id] = {
          ...node,
          x: (treeDepth - node.depth + 0.5) * CLADE_NODE_DISTANCE,
          y: (Math.max(...outgoingYs) + Math.min(...outgoingYs)) / 2,
        };
      });

    return { parsedNodes, parsedEdges: data.edges };
  }, [data.edges, data.nodes, opts.defaultRowHeight, treeDepth, leafNodeRowHeights]);

  const handleTbodyResize = React.useCallback<ResizeObserverCallback>(entries => {
    if (!entries?.length) return;

    const [{ target: tbody }] = entries;
    const trows = tbody.querySelectorAll('tr');

    const heights = Array.from(trows).map(tr => tr.getBoundingClientRect().height || 0);
    setLeafNodeRowHeights(heights);
  }, []);
  const tbodyRef = useResizeObserver<HTMLTableSectionElement>(handleTbodyResize);

  const leafNodes = Object.values(parsedNodes).filter(node => node.depth === 1);

  return (
    <Container cladogramWidth={vizWidth} id={props.id}>
      <table>
        {/* TODO: <caption>{props.title}</caption> */}
        <thead>
          <tr>
            <td />
            {data.columns.map(col => (
              <td key={col.key}>{col.label || col.key}</td>
            ))}
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          <tr>
            <td rowSpan={leafCount}>
              <svg
                className="cladogram"
                id={svgId}
                width={vizWidth}
                viewBox={`0 0 ${vizWidth} ${vizHeight}`}
              >
                <Plot parsedNodes={parsedNodes} parsedEdges={parsedEdges} />
              </svg>
            </td>
            {data.columns.map(col => (
              <td key={col.key}>
                {col.onRender ? (
                  col.onRender(leafNodes[0])
                ) : (
                  <div>{leafNodes[0].data?.[col.key]}</div>
                )}
              </td>
            ))}
          </tr>
          {leafNodes.slice(1).map(node => (
            <tr key={node.id}>
              {data.columns.map(col => (
                <td key={col.key}>
                  {col.onRender ? col.onRender(node) : <div>{node.data?.[col.key]}</div>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default React.memo(CladeTable) as typeof CladeTable;
