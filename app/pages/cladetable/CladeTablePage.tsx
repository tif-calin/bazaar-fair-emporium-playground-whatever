import { styled } from "@linaria/react";
import React from "react";
import LatinToOttid from "./components/LatinToOttid";
import CladeTable from "./components/CladeTable";
import parseTree from "./components/CladeTable/utils/parseTree";

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
    flex-grow: 1;
    min-height: 50vh;

    --shadow-color: 0deg 0% 80%;
    box-shadow: var(--shadow-inset-medium), inset 0 0 2px hsl(var(--shadow-color));
  }
`;

const [_, SAMPLE_DATA] = parseTree({
  children: [
    { children: [{ name: "alpine gentian" }, { name: "sweet lady flower" }] },
    {
      children: [
        { children: [{ name: "willow gentian" }, { name: "Karawanken gentian" }] },
        {
          children: [
            { name: "great yellow gentian" },
            {
              children: [
                { name: "purple gentian" },
                { name: "brown gentian" },
                { name: "spotted gentian" },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const CladeTablePage = () => {
  return (
    <Page>
      <header>
        <h1>CladeTable</h1>
      </header>
      <main>
        {/* <LatinToOttid /> */}
        <CladeTable title="example" id="example" data={SAMPLE_DATA} />
      </main>
      <footer></footer>
    </Page>
  );
};

export default React.memo(CladeTablePage);
