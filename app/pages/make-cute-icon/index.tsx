import { styled } from '@linaria/react';
import React from 'react';
import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import HandDrawnHeart2 from './components/HandDrawnHeart2';

const Page = styled.div`
  --color-eminence: #4a2671;
  --color-lavender: #bd96de;
  --color-lilac: #e5cef8;
  --color-canary: #fce99e;
  --color-celeste: #b1e5e0;
  --color-salmon: #e97c8b;

  --fnt-sans: var(--font-system-ui);
  font-family: var(--fnt-sans);

  display: flex;
   align-items: center;
   flex-direction: column;
  padding: 1rem;

  & > *:where(header, main):not(:empty) {
    background-color: var(--clr-fg);
    border: 1px solid var(--clr-line);
     border-radius: var(--msr-radius);
     border-bottom: 4px double var(--clr-line);
    padding: 1rem;
    width: 100%;
     max-width: calc(90vw - 20rem);
     min-width: 250px;
  }

  & p, & ul, & ol {
    margin-bottom: 1rem;
  }

  & input {
    width: 200px;
  }

  & output {
    background-color: var(--color-lilac);
    border: 1px dashed var(--clr-line);
    display: block;
    margin: 1rem 0;
    width: fit-content;
  }
`;

const DownloadButton = ({
  elementId,
  fileName,
  children,
}: {
  elementId: string;
  fileName: string;
  children: React.ReactNode;
}) => {
  const handleClickDownload = React.useCallback(() => {
    const node = document.getElementById(elementId);
    if (!node) return;
    htmlToImage.toPng(node).then(async dataUrl => download(dataUrl, fileName));
  }, [elementId, fileName]);

  return <button onClick={handleClickDownload}>{children}</button>;
};

const MakeCuteIconPage = () => {
  const [seed, setSeed] = React.useState('');

  const svgId = React.useId();

  return (
    <Page>
      <main>
        <p>I built this generator to generate cutesy icons based on a seed.</p>
        <input type="text" placeholder="Enter a seed..." onChange={e => setSeed(e.target.value)} />
        <output>
          {/* <HandDrawnHeart1 seed={seed} svgId={`${svgId}-1`} /> */}
          <HandDrawnHeart2 seed={seed} svgId={`${svgId}-2`} />
        </output>
        <DownloadButton elementId={`${svgId}-2`} fileName={`${seed}.png`}>
          Download PNG
        </DownloadButton>
      </main>
    </Page>
  );
};

export default React.memo(MakeCuteIconPage);
