import { memo } from 'react';
import { SCHEMA } from './types';
import { styled } from '@linaria/react';
import ObservationExplorer from './components/ObservationExplorer';
import { mdToHtml } from './utils/markdown';

const Page = styled.div`
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
    width: calc(90vw - 20rem);
     min-width: calc(250px + 40vw);
  }

  & p, & ul, & ol {
    margin-bottom: 1rem;
  }

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
    border: 1px solid var(--clr-line);
    padding: 0.5rem;
    width: fit-content;

    & ul {
      margin-bottom: 0;
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
      <main>
        {/* prettier-ignore */}
        <p>
          This is the home page of the <a href="https://www.inaturalist.org/projects/cat-coat-genes-project">Cat Coat Genes iNaturalist Project</a>. This page contains a thorough guide for anyone who wants to get involved with annotating cat observations.
        </p>
        <ClassificationGuide />
        <ObservationExplorer />
      </main>
    </Page>
  );
};

export default memo(CatCoatPage);
