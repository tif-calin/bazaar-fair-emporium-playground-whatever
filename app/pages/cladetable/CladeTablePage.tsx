import { styled } from "@linaria/react";
import React from "react";
import PhylogeneticCladeTable from "./components/PhylogeneticCladeTable";
import ToolBar from './components/ToolBar';

const Page = styled.div`
  --clr-focus: var(--oc-orange-4);
  --msr-radius: 0.15rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  margin: auto;
  min-height: calc(100vh - 2rem);
  padding: 1rem;
  position: relative;

  & > *:where(header, main):not(:empty) {
    background-color: var(--clr-fg);
    border: 1px double var(--clr-line);
    border-radius: var(--msr-radius);
    border-bottom: 4px double var(--clr-line);
    padding: 1rem;
    width: 100%;
    max-width: min(80ch, calc(100vw - 4rem));
    min-width: 250px;
  }

  & > main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    min-height: 50vh;
  }
`;

const CladeTablePage = () => {
  return (
    <Page>
      <header>
        <h1>CladeTable</h1>
      </header>
      <main>
        <ToolBar />
        {/* <LatinToOttid /> */}
        <PhylogeneticCladeTable />
      </main>
      <footer></footer>
    </Page>
  );
};

export default React.memo(CladeTablePage);
