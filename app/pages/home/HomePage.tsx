import React from 'react';
import { styled } from "@linaria/react";
import RainbowText from '~/components/RainbowText';

const Page = styled.div`
  display: flex;
   align-items: center;
   flex-direction: column;
   gap: 0.5rem;
  margin: auto;
  min-height: 100vh;
  padding: 1rem;

  & > *:where(header, main, footer):not(:empty) {
    border: 1px solid var(--clr-line);
     border-radius: 0.125rem;
    background-color: var(--clr-fg);
    padding: 1rem;
    width: 100%;
     max-width: min(80ch, calc(100vw - 4rem));
     min-width: 250px;
  }

  & > main {
    flex-grow: 1;

    --shadow-color: 0deg 0% 80%;
    box-shadow: var(--shadow-inset-medium), inset 0 0 2px hsl(var(--shadow-color));
  }
`;

type Props = {};

const HomePage = (_: Props): React.ReactElement => {
  return (
    <>
      <Page>
        <header>
          <h1>
            <RainbowText text="Home Page" />
          </h1>
        </header>
        <main>
          <div
            className="content"
          >This is the home page</div>
        </main>
        <footer></footer>
      </Page>
    </>
  );
};

export default HomePage;
