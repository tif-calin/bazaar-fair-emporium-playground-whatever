import React from "react";
import parseNewick from "../../utils/parseNewick";
import CladeTable from "../CladeTable";
import parseTree from "../CladeTable/utils/parseTree";
import { styled } from "@linaria/react";
import prepareNewickTree from './utils/prepareNewickTree';

const DEFAULT_NEWICK =
  "((((Solanum_galapagense_ott200836,((Solanum_cheesmaniae_ott242855,Solanum_pimpinellifolium_ott797186),(Solanum_lycopersicum_var._cerasiforme_ott640492)Solanum_lycopersicum_ott378964)),(Solanum_chmielewskii_ott360692,(Solanum_pennellii_var._puberulum_ott508882)Solanum_pennellii_ott1069768)),(Solanum_chilense_ott378983,('[Lycopersicon] peruvianum var. humifusum ott837938','[Lycopersicon] peruvianum var. dentatum ott856663')Solanum_peruvianum_ott378975)),((Lycopersicon_hirsutum_f._glabratum_ott807666)Solanum_habrochaites_ott885264,Solanum_neorickii_ott885270));";

const InputSection = styled.div`
  display: flex;
  flex-direction: column;

  & textarea {
    background: var(--clr-bg);
    border: 1px solid var(--clr-line);
    font-family: var(--fnt-mono);
    font-size: 0.75em;
    padding: 0.5rem;
    resize: vertical;
    word-wrap: break-word;
  }
`;

// type Props = {
//   newick: string;
//   csv: string;
// };

const PhylogeneticCladeTable = () => {
  const [newickTree, setNewickTree] = React.useState(DEFAULT_NEWICK);

  const handleTextAreaChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setNewickTree(e.target.value);
  }, []);

  const cladeTableData = React.useMemo(() => {
    const rootNode = parseNewick(newickTree);
    prepareNewickTree(rootNode);
    const [_, cladeTableData] = parseTree(rootNode);

    const newNodes = Object.values(cladeTableData.nodes).map((node) => [
      node.id,
      {
        ...node,
        data: {
          ...node.data,
          ottLabel: node.label || node.id,
        },
      },
    ]);

    console.count("rerender");

    return {
      columns: [
        { key: "latinName", label: "Latin Name" },
        { key: "ottId", label: "OTT ID" },
      ],
      ...cladeTableData,
      nodes: Object.fromEntries(newNodes),
    };
  }, [newickTree]);

  return (
    <>
      <CladeTable title="example" id="example" data={cladeTableData} />
      <InputSection>
        <textarea value={newickTree} onChange={handleTextAreaChange} />
      </InputSection>
    </>
  );
};

export default PhylogeneticCladeTable;
