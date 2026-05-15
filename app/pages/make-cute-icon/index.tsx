import { styled } from '@linaria/react';
import React from 'react';
import { drawIcon } from './draw';
import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';

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

  const { path, rotation, fill } = React.useMemo(() => drawIcon(seed), [seed]);

  const svgId = React.useId();

  // console.log({ seed, path, rotation });

  return (
    <Page>
      <main>
        <p>I built this generator to generate cutesy icons based on a seed.</p>
        <input type="text" placeholder="Enter a seed..." onChange={e => setSeed(e.target.value)} />
        <output>
          <svg id={svgId} viewBox="0 0 400 400" width="200" height="200">
            <defs>
              <filter id={`chalk-${seed}`} x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  baseFrequency="9.999"
                  numOctaves="1"
                  result="noise"
                  type="fractalNoise"
                />
                <feComponentTransfer in="noise" result="speckle">
                  <feFuncA type="linear" slope="20" intercept="-7" />
                </feComponentTransfer>
                <feComposite in="SourceGraphic" in2="speckle" operator="in" />
              </filter>
              <filter id={`crayon-${seed}`}>
                <feTurbulence
                  baseFrequency="0.04"
                  numOctaves="3"
                  result="noise"
                  type="fractalNoise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="7"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
            <g
              fill={fill}
              filter={`url(#crayon-${seed})`}
              id={`icon-${seed}`}
              transform-origin="200 200"
              transform={`translate(0, -125) rotate(${-135 + rotation})`}
            >
              <path filter={`url(#chalk-${seed})`} d={path} />
              <path d={path} fill="none" stroke-width="20" stroke="#111d" />
            </g>
          </svg>
        </output>
        <DownloadButton elementId={svgId} fileName={`${seed}.png`}>
          Download PNG
        </DownloadButton>
      </main>
    </Page>
  );
};

export default React.memo(MakeCuteIconPage);
