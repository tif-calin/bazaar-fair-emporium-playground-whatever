import { memo } from 'react';
import { SCHEMA } from './types';
import { styled } from '@linaria/react';
import ObservationExplorer from './components/ObservationExplorer';
import { mdToHtml } from './utils/markdown';

const Page = styled.div`
  --fnt-sans: var(--font-system-ui);
  --clr-link-ext: #1c7ed6;
  --clr-link-visited: #5f3dc4;
  --clr-link-jump: #0d375e;

  @media (prefers-color-scheme: dark) {
    --clr-link-ext: #74c0fc;
    --clr-link-visited: #9775fa;
    --clr-link-jump: #d0ebff;
  }

  display: flex;
   align-items: center;
   flex-direction: column;
   gap: 1rem;
  font-family: var(--fnt-sans);
  padding: 1rem;

  & > *:where(header, main):not(:empty) {
    background-color: var(--clr-fg);
    border: 1px solid var(--clr-line);
     border-radius: var(--msr-radius);
     border-bottom: 4px double var(--clr-line);
    padding: 1rem;
    width: calc(90vw - 20rem);
     min-width: calc(250px + 40vw);
  }

  & :where(a) {
    text-decoration: none;

    &:link { color: var(--clr-link-ext); }
    &:visited { color: var(--clr-link-visited); }
    &:hover { text-decoration: underline; }
    &[href^="#"] {
      color: var(--clr-link-jump);
      text-decoration: underline dashed;
    }
  }

  & p, & ul, & ol { margin-bottom: 1rem; }

  & h2 {
    font-size: 1.25em;
    font-weight: 600;
    margin: 10px 0;
  }

  & h3 {
    font-size: 1.15em;
    font-weight: 500;
    margin: 10px 0;
  }
`;

const StyledArticle = styled.article`
  & p + :where(ul, ol) { margin-top: -1rem; }

  & .toc {
    background-color: var(--clr-bg);
    border-left: 3px solid var(--clr-line);
    padding: 0.5rem;
    width: fit-content;

    & ul {
      margin-bottom: 0;
    }

    & a {
      text-decoration: none;
    }
  }
`;

const ClassificationGuide = async () => {
  const __html = await mdToHtml(SCHEMA.guide);

  return <StyledArticle dangerouslySetInnerHTML={{ __html }} />;
};

const CatCoatPage = () => {
  return (
    <Page>
      <header>
        <h1>Cat Coat Genes Project</h1>
      </header>
      <main>
        {/* prettier-ignore */}
        <p>
          This is the home page of the <a href="https://www.inaturalist.org/projects/cat-coat-genes-project">Cat Coat Genes Project on iNaturalist</a>. This page contains a thorough guide for anyone who wants to get involved with annotating cat observations.
        </p>
        <ClassificationGuide />
        <ObservationExplorer />
      </main>
    </Page>
  );
};

export default memo(CatCoatPage);
