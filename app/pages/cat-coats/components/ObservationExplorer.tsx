import React, { useEffect, useMemo, useState } from 'react';
import { getAllObservations } from '../utils/inaturalist';
import { styled } from '@linaria/react';
import { isLocusSlug, SCHEMA, type LocusSlug } from '../types';

const Wrapper = styled.section`
  & .display {
    display: flex;
     flex-direction: column;
     gap: 0.5rem;
    border: 1px solid var(--clr-line);
    padding: 0.5rem;

    & .gallery {
      display: flex;
       flex-wrap: wrap;
       gap: 0.5rem;

      & .cat-card {
        flex-basis: calc((100% - 1.5rem) / 4);

        & img {
          aspect-ratio: 1 / 1;
          object-fit: cover;
          width: 100%;
        }
      }
    }

    & .pagination {
      display: flex;
      justify-content: space-between;
    }
  }
`;

/**
 * https://api.inaturalist.org/v2/observations?project_id=cat-coat-genes-project&fields=
 */
const ObservationExplorer = () => {
  const [cats, setCats] = useState<Awaited<ReturnType<typeof getAllObservations>>['cats']>([]);
  const [galleryPage, setGalleryPage] = useState(0);
  const [selectedLocusFilter, setSelectedLocusFilter] = useState<LocusSlug>('piebald');
  const [selectedLocusFilterValue, setSelectedLocusFilterValue] = useState('');

  useEffect(() => {
    const setData = async () => {
      const data = await getAllObservations();
      setCats(data.cats);
    };

    setData();
  }, []);

  const filteredCats = useMemo(
    () =>
      cats
        .filter(cat => cat.photo.license_code !== null)
        .filter(cat => {
          if (selectedLocusFilter && selectedLocusFilterValue) {
            return cat.tags[selectedLocusFilter] === selectedLocusFilterValue;
          }

          return true;
        }),
    [cats, selectedLocusFilter, selectedLocusFilterValue]
  );

  const pageSize = 16;
  const maxPage = Math.ceil(filteredCats.length / pageSize);

  return (
    <Wrapper>
      <h2>Observation Explorer</h2>
      <div className="display">
        <form className="filters">
          <span>
            <select
              value={selectedLocusFilter}
              onChange={e => {
                const targetValue = e.currentTarget.value;
                if (!isLocusSlug(targetValue)) return;
                setSelectedLocusFilter(targetValue);
                setSelectedLocusFilterValue('');
              }}
            >
              {SCHEMA.loci.map(locus => (
                <option key={locus.slug} value={locus.slug}>
                  {locus.slug}
                </option>
              ))}
            </select>{' '}
            is{' '}
            <select
              onChange={e => setSelectedLocusFilterValue(e.currentTarget.value)}
              value={selectedLocusFilterValue}
            >
              <option value="">--</option>
              {SCHEMA.loci
                .find(locus => locus.slug === selectedLocusFilter)
                ?.values.map(locusValue => (
                  <option key={locusValue} value={locusValue}>
                    {locusValue}
                  </option>
                ))}
            </select>
          </span>
        </form>
        <div className="gallery">
          {filteredCats.slice(galleryPage * pageSize, (galleryPage + 1) * pageSize).map(cat => (
            <a
              className="cat-card"
              href={`https://www.inaturalist.org/observations/${cat.id}`}
              key={cat.id}
            >
              <img src={cat.photo.url.replace('/square.', '/small.')} alt={/* TODO */ ''} />
            </a>
          ))}
        </div>
        <div className="pagination">
          <button
            disabled={!galleryPage}
            onClick={() => setGalleryPage(Math.max(0, galleryPage - 1))}
          >
            &larr; prev
          </button>
          <span>
            Page {galleryPage + 1} of {maxPage}
          </span>
          <button
            disabled={galleryPage >= maxPage - 1}
            onClick={() => setGalleryPage(Math.min(maxPage, galleryPage + 1))}
          >
            next &rarr;
          </button>
        </div>
      </div>
      <p>{cats.length} total cats have been annotated.</p>
    </Wrapper>
  );
};

export default React.memo(ObservationExplorer);
