import React from 'react';
import { parseNewick } from '../../utils/newick';
import CladeTable from '../CladeTable';
import parseTreeForCladeTable from '../CladeTable/utils/parseTreeForCladeTable';
import { styled } from '@linaria/react';
import prepareNewickTree, { prepareFromString } from './utils/prepareNewickTree';
import type { CladeTableData } from '../CladeTable/types';
import Input from '../Input';
import RelatedAndWellKnownSpeciesForm from '../RelatedAndWellKnownSpeciesForm';
import { parseCsv } from './utils/csv';
import { groupByFunction } from '~/utils/collections';

const DEFAULT_NEWICK = prepareFromString(
  // eslint-disable-next-line max-len
  "((((Solanum_galapagense_ott200836,((Solanum_cheesmaniae_ott242855,Solanum_pimpinellifolium_ott797186),(Solanum_lycopersicum_var._cerasiforme_ott640492)Solanum_lycopersicum_ott378964)),(Solanum_chmielewskii_ott360692,(Solanum_pennellii_var._puberulum_ott508882)Solanum_pennellii_ott1069768)),(Solanum_chilense_ott378983,('[Lycopersicon] peruvianum var. humifusum ott837938','[Lycopersicon] peruvianum var. dentatum ott856663')Solanum_peruvianum_ott378975)),((Lycopersicon_hirsutum_f._glabratum_ott807666)Solanum_habrochaites_ott885264,Solanum_neorickii_ott885270));"
);

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

const Hr = styled.hr`
  border-bottom: 4px double var(--clr-line);
  margin: 1rem 0;
`;

// type Props = {
//   newick: string;
//   csv: string;
// };

const LatinNameCell = styled.div`
  font-style: italic;
`;

const PhylogeneticCladeTable = () => {
  const [newickTree, setNewickTree] = React.useState(DEFAULT_NEWICK);
  const [csv, setCsv] = React.useState('');

  const handleTextAreaChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewickTree(e.target.value);
  }, []);

  const cladeTableData = React.useMemo<CladeTableData>(() => {
    const rootNode = parseNewick(newickTree);
    prepareNewickTree(rootNode);
    const [_, cladeTableData] = parseTreeForCladeTable(rootNode);

    const { data: parsedCsv } = parseCsv(csv);
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

    const columns: CladeTableData['columns'] = [
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
        label: 'Wikipedia Popularity',
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

  return (
    <>
      <CladeTable title="example" id="example" data={cladeTableData} />
      <Hr />
      <InputSection>
        <RelatedAndWellKnownSpeciesForm setNewick={setNewickTree} setCsv={setCsv} />
        <Input
          kind="textarea"
          name="newick"
          label="Newick"
          type="text"
          value={newickTree}
          onChange={handleTextAreaChange}
        />
      </InputSection>
    </>
  );
};

export default PhylogeneticCladeTable;
