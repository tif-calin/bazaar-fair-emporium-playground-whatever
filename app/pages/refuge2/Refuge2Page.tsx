import { styled } from '@linaria/react';
import React from 'react';
import DataOverview from './components/DataOverview';

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  margin: auto;
  padding: 1rem;

  & > *:where(header, main, footer):not(:empty) {
    background-color: var(--clr-fg);
    border: 1px solid var(--clr-line);
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

const Refuge2Page = () => {
  return (
    <Page>
      <header>
        <h1>Refuge2</h1>
      </header>
      <main>
        <DataOverview />
      </main>
      <footer></footer>
    </Page>
  );
};

export default React.memo(Refuge2Page);
