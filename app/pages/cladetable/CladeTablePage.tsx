import { styled } from "@linaria/react";
import React from "react";
import PhylogeneticCladeTable from "./components/PhylogeneticCladeTable";

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  margin: auto;
  padding: 1rem;

  & > *:where(header, main, footer):not(:empty) {
    background-color: var(--clr-fg);
    border: 1px double var(--clr-line);
    border-radius: 0.125rem;
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
        {/* <LatinToOttid /> */}
        <PhylogeneticCladeTable />
      </main>
      <footer></footer>
    </Page>
  );
};

export default React.memo(CladeTablePage);
