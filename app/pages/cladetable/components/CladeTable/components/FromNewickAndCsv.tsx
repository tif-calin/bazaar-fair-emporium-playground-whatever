import React from 'react';
import CladeTable from '..';
import { parseNewick } from '../../../utils/newick';
import parseNewickNodeForCladeTable from '../utils/parseNewickNodeForCladeTable';
import { parseCsv } from '../../../utils/csv';
import { keyByFunction } from '~/utils/collections';
import ActionArea from './ActionArea';
import { styled } from '@linaria/react';

const ScrollContainer = styled.div`
  display: flex;
  overflow: auto;
  padding: 2px 0;
`;

type Props = {
  /**
   * Node labels are expected to serve as the identifier for the csv.
   */
  newick: string;
  /**
   * The expectation is that the first column is the identifier.
   */
  csv: string;
};

/**
 * This is meant to be an alternative API for the `CladeTable` component that builds a CladeTable
 * from just a newick string and a csv string.
 */
const FromNewickAndCsv = ({ newick, csv }: Props) => {
  const id = React.useId();

  const data = React.useMemo(() => {
    if (!newick) return { columns: [], nodes: {}, edges: {} };

    const newickNode = parseNewick(newick);
    const [_rootId, { nodes, edges }] = parseNewickNodeForCladeTable(newickNode);
    const [header = [], ...rows] = parseCsv(csv);

    const nodeLookup = keyByFunction(Object.values(nodes), node => node.label || '');

    if (header?.length && rows?.length) {
      rows.forEach(row => {
        const nodeId = row[0];

        row.slice(1).forEach((value, j) => {
          const node = nodeLookup[nodeId];
          if (!node) return;
          node.data = { [header[j + 1]]: value, ...node.data };
        });
      });
    }

    return {
      columns: header.slice(1).map(header => ({ key: header, label: header })),
      nodes,
      edges,
    };
  }, [csv, newick]);

  const nodeCount = Object.keys(data?.nodes).length;
  if (!nodeCount) return <span key="empty">No data to render</span>;
  return (
      <ScrollContainer>
      <CladeTable key={`${vizId}-${nodeCount}`} title="example" id={vizId} data={data} />
      </ScrollContainer>
  );
};

export default React.memo(FromNewickAndCsv) as typeof FromNewickAndCsv;
