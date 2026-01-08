import { styled } from '@linaria/react';
import type { CladeTableData } from '../../components/CladeTable/types';
import InlineIcon from './InlineIcon';
import { getNearbySpecies } from '../../components/RelatedAndWellKnownSpeciesForm/utils/inaturalist';
import { unparseCsv } from '../../utils/csv';
import { objectFromEntries } from '~/utils/object';
import { getNearbySpecies } from '../../utils/services/inaturalist';
import { getInducedSubtree } from '../../utils/services/opentree';

export const prettyCoord = (coord: string | number) => Math.round(Number(coord) * 10_000) / 10_000;

// ------------------------------------ //
// #region Generate Viz                 //

export const MORPHOLOGY_CATEGORIES = [
  'hymeniumType',
  'capShape',
  'whichGills',
  'stipeCharacter',
  'ecologicalType',
  'howEdible',
  'sporePrintColor',
] as const;

type MorphologyCategory = (typeof MORPHOLOGY_CATEGORIES)[number];
type MorphologyTag = `${MorphologyCategory}:${string}`;
type MycomorphboxData = {
  pages: Record<
    string,
    { latinName: string; identifiers: Record<string, string>; morphologyTags: MorphologyTag[] }
  >;
};

let DATA: MycomorphboxData | undefined = undefined;

// TODO: figure out an automated way to handle this (culi)
const ottidsThatCauseErrors = new Set(['1044745', '212213', '459131', '466871', '687148']);
export const generateMycomorphboxViz = async (latitude: number, longitude: number) => {
  // 0. Setup opts
  const opts = {
    radius: 12,
    trimSingleParents: true,
  };

  // 1. Load data
  DATA ||= (await import('./mycomorphbox-data.json')) as MycomorphboxData;

  // 2. Fetch data
  const currentMonth = new Date().getMonth() + 12;
  const months = [currentMonth - 1, currentMonth, currentMonth + 1].map(m => ((m + 12) % 12) + 1);
  const inatData = await getNearbySpecies({
    latitude,
    longitude,
    months,
    radius: opts.radius,
    taxon_id: 47170,
  });
  if (!inatData) throw new Error(`No iNaturalist results found: (${latitude}, ${longitude})`);

  // 3. Prepare data
  const speciesNearMe = new Set(inatData.results.map(sp => sp.taxon.name));

  const csvData = Object.entries(DATA.pages)
    .filter(
      ([k, p]) =>
        p.identifiers['Open Tree of Life'] &&
        // sometimes the accepted latin name is different from the page name
        [k, p.latinName].some(s => speciesNearMe.has(s)) &&
        !ottidsThatCauseErrors.has(p.identifiers['Open Tree of Life'])
    )
    .map(([_k, s]) => ({
      ottid: s.identifiers['Open Tree of Life'],
      name: s.latinName,
      mrph: s.morphologyTags,
    }))
    .map(({ mrph, ...s }) => ({
      ...s,
      ...objectFromEntries(
        MORPHOLOGY_CATEGORIES.map(colKey => [
          colKey,
          mrph
            .filter(tag => tag.startsWith(colKey))
            .toSorted()
            .map(tag => tag.split(':')[1])
            .join(', '),
        ])
      ),
    }));

  const tallies = objectFromEntries(
    MORPHOLOGY_CATEGORIES.map(key => [key, tally(csvData.map(row => row[key].split(', ')).flat())])
  );

  const csv = unparseCsv([
    ['ottid', 'name', ...MORPHOLOGY_CATEGORIES],
    ...csvData.map(s => Object.values(s)),
  ]);

  const inducedSubtree = await getInducedSubtree(
    csvData.map(s => s.ottid),
    { label_format: 'id' }
  );
  if (!inducedSubtree) throw new Error(`No subtree found for ${latitude}, ${longitude}`);
  const newick = inducedSubtree.newick
    .replaceAll(/\)(mrcaott\d+)?ott\d+/g, ')')
    .replaceAll(/ott/g, '');

  return { csv, newick };
};

// #endregion Generate Viz.             //
// ------------------------------------ //

// ------------------------------------ //
// #region Column Rendering             //

/**
 * See: https://en.wikipedia.org/wiki/Template:Mycomorphbox
 */
const ICON_TO_TAG: Record<MorphologyTag, string> = {
  'capShape:campanulate': 'Campanulate_cap_icon',
  'capShape:conical': 'Conical_cap_icon',
  'capShape:convex': 'Convex_cap_icon',
  'capShape:depressed': 'Depressed_cap_icon',
  'capShape:flat': 'Flat_cap_icon',
  'capShape:infundibuliform': 'Infundibuliform_cap_icon',
  'capShape:no': 'No_cap_icon',
  'capShape:not-applicable': 'NA_cap_icon',
  'capShape:offset': 'Offset_cap_icon',
  'capShape:ovate': 'Ovate_cap_icon',
  'capShape:umbilicate': 'Umbillicate_cap_icon',
  'capShape:umbonate': 'Umbonate_cap_icon',
  'ecologicalType:mycorrhizal': 'Mycorrhizal_fungus',
  'ecologicalType:parasitic': 'Parasitic_fungus',
  'ecologicalType:saprotrophic': 'Saprotrophic_fungus',
  'howEdible:allergenic': 'Mycomorphbox_Caution',
  'howEdible:caution-not-recommended': 'Mycomorphbox_Caution',
  'howEdible:choice': 'Mycomorphbox_Choice',
  'howEdible:deadly': 'Mycomorphbox_Deadly',
  'howEdible:edible': 'Mycomorphbox_Edible',
  'howEdible:inedible': 'Mycomorphbox_Inedible',
  'howEdible:unpalatable': 'Mycomorphbox_Inedible',
  'howEdible:too-hard-to-eat': 'Mycomorphbox_Inedible',
  'howEdible:poisonous': 'Mycomorphbox_Poison',
  'howEdible:psychoactive': 'Mycomorphbox_Psychoactive',
  'howEdible:unknown': 'Mycomorphbox_Question',
  'hymeniumType:gills': 'Gills_icon',
  'hymeniumType:gleba': 'Gleba_icon',
  'hymeniumType:pores': 'Pores_icon',
  'hymeniumType:ridges': 'Ridges_icon',
  'hymeniumType:smooth': 'Smooth_icon',
  'hymeniumType:teeth': 'Teeth_icon',
  'stipeCharacter:bare': 'Bare_stipe_icon',
  'stipeCharacter:cortina': 'Cortina_stipe_icon',
  'stipeCharacter:not-applicable': 'NA_cap_icon',
  'stipeCharacter:ring-and-volva': 'Ring_and_volva_stipe_icon',
  'stipeCharacter:ring': 'Ring_stipe_icon',
  'stipeCharacter:volva': 'Volva_stipe_icon',
  'whichGills:adnate': 'Adnate_gills_icon2',
  'whichGills:adnexed': 'Adnexed_gills_icon2',
  'whichGills:decurrent': 'Decurrent_gills_icon2',
  'whichGills:emarginate': 'Emarginate_gills_icon2',
  'whichGills:free': 'Free_gills_icon2',
  'whichGills:not-applicable': 'NA_cap_icon',
  'whichGills:seceding': 'Seceding_gills_icon2',
  'whichGills:sinuate': 'Sinuate_gills_icon2',
  'whichGills:subdecurrent': 'Subdecurrent_gills_icon2',
};

const COLUMN_LABELS: Record<MorphologyCategory, string> = {
  hymeniumType: 'Hymenium',
  capShape: 'Cap Shape',
  whichGills: 'Gills',
  stipeCharacter: 'Stipe',
  ecologicalType: 'Ecology',
  howEdible: 'Edibility',
  sporePrintColor: 'Spore Print',
};

const COLOR_LABELS: Record<string, string> = {
  '#ffffff': 'white', // 595
  '#5d431f': 'brown', // 242
  '#f2efba': 'yellow', // 83
  '#878156': 'olive-brown', // 82
  '#faf5e7': 'cream', // 80
  '#67321a': 'reddish-brown', // 68
  '#4b3545': 'purple-brown', // 56
  '#f7cfca': 'pink', // 45
  '#271c13': 'blackish-brown', // 46
  '#000000': 'black', // 44
  '#788861': 'olive', // 31
  '#ebd69a': 'buff', // 22
  '#cc7722': 'ochre', // 21
  '#ffbf68': 'yellow-orange', // 16
  '#f6cfb3': 'salmon', // 15
  '#f4c6a6': 'pinkish-brown', // 14
  '#cb9735': 'yellow-brown', // 12
  '#cba777': 'tan', // 10
  '#3b2a42': 'purple-black', // 10
  '#5a4364': 'purple', // 8
  '#7c8a68': 'green', // 2
};

const NameCell = styled.span`
  font-style: italic;
`;
const SporePrintCell = styled.div`
  align-content: center;
  height: 2rem;
  width: 100%;

  & > span {
    display: flex;
     align-items: center;
     justify-content: center;
    filter:
      drop-shadow(1px 1px var(--clr-bg))
      drop-shadow(1px -1px var(--clr-bg))
      drop-shadow(-1px -1px var(--clr-bg))
      drop-shadow(-1px 1px var(--clr-bg))
      drop-shadow(0 0 1px var(--clr-bg))
    ;
  }
`;
const MorphologyCell = styled.div<{
  iconCount: number;
}>`
  display: flex;
   align-items: center;
  font-size: 2rem;
  min-width: ${p => (p.iconCount || 1) * 2}rem;
  height: 2rem;
  position: relative;
`;
const PositionedIcon = styled.span<{
  positionIndex: number;
}>`
  position: ${p => (p.positionIndex ? 'absolute' : 'unset')};
  left: ${p => (p.positionIndex ? `${p.positionIndex * 2}rem` : 'unset')};
`;

export const makePredefinedColumn = (
  key: MorphologyCategory | 'name',
  tallies?: Awaited<ReturnType<typeof generateMycomorphboxViz>>['tallies']
): CladeTableData['columns'][number] => {
  switch (key) {
    case 'name':
      return {
        key,
        label: 'Latin Name',
        onRender: node => {
          const nameLatin = node.data?.name || '';
          return (
            <NameCell>
              <a
                href={`https://en.wikipedia.org/wiki/${`${nameLatin}`.replaceAll(/\s/g, '_')}`}
                target="_blank"
              >
                {nameLatin}
              </a>
            </NameCell>
          );
        },
      };
    case 'sporePrintColor': {
      return {
        key,
        label: 'Spore Print',
        onRender: node => {
          if (typeof node.data?.[key] !== 'string') return null;
          const hexes = node.data?.[key]
            .split(', ')
            .filter(Boolean)
            .toSorted()
            .map(hex => `#${hex}`);
          const colors = hexes.map(hex => COLOR_LABELS[hex] || hex);

          const sections = colors.length * 2;
          const gradient = Array.from({ length: sections })
            .map((_, i) => `${hexes[Math.floor(i / 2)]} ${i * 7.55}px`)
            .join(', ');

          return (
            <SporePrintCell style={{ background: `repeating-linear-gradient(45deg, ${gradient})` }}>
              <span>{colors.join(' or ')}</span>
            </SporePrintCell>
          );
        },
      };
    }
    default:
      return {
        key,
        label: COLUMN_LABELS[key],
        onRender: node => {
          if (typeof node.data?.[key] !== 'string') return null;
          const values = node.data?.[key].split(', ').toSorted();
          const keyVals =
            tallies?.[key] && key !== 'howEdible'
              ? Object.keys(tallies?.[key]).filter(tag => !!tag && tag !== 'not-applicable')
              : [];
          return (
            <MorphologyCell key={`${node.id}-${key}`} iconCount={keyVals.length || values?.length}>
              {values.map((tagVal, i) => {
                const tag: MorphologyTag = `${key}:${tagVal}`;
                const fileName = ICON_TO_TAG[tag];
                const pathToIcon = fileName ? `/assets/mycoicons/${fileName}.png` : '';

                let position = i;
                if (keyVals.length) position = keyVals.indexOf(tagVal);
                if (tagVal === 'not-applicable') position = i;

                return (
                  <PositionedIcon key={`${node.id}-${key}-${tagVal}`} positionIndex={position}>
                  <InlineIcon
                    altText={`Mycomorphbox Icon for ${tag} ${key}`}
                    fallback={tagVal}
                    path={pathToIcon}
                    title={tagVal}
                  />
                  </PositionedIcon>
                );
              })}
            </MorphologyCell>
          );
        },
      };
  }
};

// #endregion Column Rendering          //
// ------------------------------------ //
