import { styled } from '@linaria/react';
import React from 'react';
import ToolBar from './components/ToolBar';
import LocalShroomKey from './implementations/LocalShroomKey';

const bgSvg = btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
  <filter id="noise" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="5" stitchTiles="stitch"/>
    <feBlend mode="screen"/>
  </filter>
  <filter id="noise2" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" stitchTiles="stitch"/>
    <feBlend mode="screen"/>
  </filter>
  <rect width="500" fill="var(--clr-bg)" height="500" filter="url(#noise)" opacity="0.45"/>
  <rect width="500" fill="var(--clr-bg)" height="500" filter="url(#noise2)" opacity="0.1"/>
</svg>`);

const Page = styled.div`
  --clr-focus: var(--oc-orange-4);
  --msr-radius: 0.15rem;
  --msr-input-height: 28px;

  background-image: url("data:image/svg+xml;base64,${bgSvg}");
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
    border: 1px solid var(--clr-line);
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
    min-height: 50vh;
  }

  & > footer {
    margin-top: auto;

    &:hover a {
      &::before,
      &::after {
        content: "\\2620";
      }
    }
  }
`;

const SOURCE_URL =
  // eslint-disable-next-line max-len
  'https://github.com/tif-calin/bazaar-fair-emporium-playground-whatever/tree/main/app/pages/cladetable';

const CladeTablePage = () => {
  return (
    <Page>
      <header>
        <h1>CladeTable</h1>
      </header>
      <main>
        <ToolBar />
        {/* <PhylogeneticCladeTable /> */}
        <LocalShroomKey />
      </main>
      <footer>
        <a href={SOURCE_URL}> steal this </a>
      </footer>
    </Page>
  );
};

export default React.memo(CladeTablePage);
