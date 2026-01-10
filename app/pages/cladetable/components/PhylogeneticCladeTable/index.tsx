import React from 'react';
import { parseNewick } from '../../utils/newick';
import CladeTable from '../CladeTable';
import { styled } from '@linaria/react';
import { prepareOtolNewickTree, trimUnnecessaryParents } from './utils/prepareNewickTree';
import type { CladeTableData } from '../CladeTable/types';
import RelatedAndWellKnownSpeciesForm from '../RelatedAndWellKnownSpeciesForm';
import { groupByFunction } from '~/utils/collections';
import parseNewickNodeForCladeTable from '../CladeTable/utils/parseNewickNodeForCladeTable';
import type { PhylogeneticNodeData } from './types';
import { parseCsv } from '../../utils/csv';
import ActionArea from '../CladeTable/components/ActionArea';

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & textarea {
    font-family: var(--fnt-mono);
    font-size: 0.75em;
    resize: vertical;
    word-wrap: break-word;
  }
`;

const LatinNameCell = styled.div`
  font-style: italic;
`;

const PhylogeneticCladeTable = () => {
  const [newickTree, setNewickTree] = React.useState('');
  const [csv, setCsv] = React.useState('');

  // const handleTextAreaChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setNewickTree(e.target.value);
  // }, []);

  const cladeTableData = React.useMemo<CladeTableData<PhylogeneticNodeData>>(() => {
    const rootNode = parseNewick(newickTree);
    prepareOtolNewickTree(rootNode);
    trimUnnecessaryParents(rootNode);
    const [_, cladeTableData] = parseNewickNodeForCladeTable(rootNode);

    const parsedCsv = parseCsv(csv);
    const csvRowsById = groupByFunction(parsedCsv, row => row[1]);

    const newNodes = Object.values(cladeTableData.nodes).map(node => {
      let nodeData = { ...node.data, ottLabel: node.label || node.id };
      const csvData = csvRowsById[node.data?.ottId as string]?.[0];
      if (csvData) {
        nodeData = {
          ...nodeData,
          ...Object.fromEntries(parsedCsv[0].map((header, i) => [header, csvData?.[i]])),
        };
      }

      return [node.id, { ...node, data: nodeData }];
    });

    const columns: CladeTableData<PhylogeneticNodeData>['columns'] = [
      {
        key: 'latinName',
        label: 'Latin Name',
        onRender: node => <LatinNameCell>{node.data?.latinName}</LatinNameCell>,
      },
      { key: 'ottId', label: 'OTT ID' },
    ];

    if (csv) {
      columns.push({
        key: 'popularity',
        label: (
          <>
            Wikipedia
            <br />
            Popularity
          </>
        ),
        onRender: node => (
          <div>
            <a href={`https://en.wikipedia.org/wiki/${node.data?.latinName}`}>
              {Math.round(Number(node.data?.popularity)).toLocaleString()}
            </a>
          </div>
        ),
      });
    }

    return { columns, ...cladeTableData, nodes: Object.fromEntries(newNodes) };
  }, [csv, newickTree]);

  const cladeTableId = React.useId();

  return (
    <>
      <InputSection>
        <RelatedAndWellKnownSpeciesForm setNewick={setNewickTree} setCsv={setCsv} />
        {/* <Input
          kind="textarea"
          name="newick"
          label="Newick"
          type="text"
          value={newickTree}
          onChange={handleTextAreaChange}
        /> */}
      </InputSection>
      {newickTree.length ? (
        <>
          <CladeTable<PhylogeneticNodeData>
            title="Related and well-known species."
            id={cladeTableId}
            data={cladeTableData}
          />
          <ActionArea cladeTableId={cladeTableId} />
        </>
      ) : (
        'No data to render.'
      )}
    </>
  );
};

export default PhylogeneticCladeTable;
