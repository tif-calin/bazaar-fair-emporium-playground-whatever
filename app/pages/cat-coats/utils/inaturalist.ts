import { httpRequest } from '~/utils/http';
import { filterObject, objectFromEntries } from '~/utils/object';
import { SCHEMA } from '../types';
import { notEmpty } from '~/utils/collections';

const BASE_URL_V2 = 'https://api.inaturalist.org/v2';

type LicenseCode =
  | 'cc0'
  | 'cc-by'
  | 'cc-by-sa'
  | 'cc-by-nd'
  | 'cc-by-nc'
  | 'cc-by-nc-sa'
  | 'cc-by-nc-nd';

type GetProjectSpeciesResult = {
  total_results: number;
  page: number;
  per_page: number;
  results: Array<{
    id: string;
    uuid: string;
    annotations: Array<{ concatenated_attr_val: `${number}|${number}` }>;
    license_code: null | LicenseCode;
    ofvs: Array<{
      id: number;
      uuid: string;
      field_id: number;
      user_id: number;
      updater_id?: number;
      value: string;
    }>;
    photos: Array<{
      id: number;
      attribution: string;
      license_code: null | LicenseCode;
      url: string;
    }>;
  }>;
};

type OptsForFetchObservationsInProject = Partial<{
  /**
   * The default `per_page` is 200.
   *
   * @default 0
   */
  page: number;
}>;
const fetchObservationsInProject = async (options?: OptsForFetchObservationsInProject) => {
  const opts = {
    fields: `(
      id:!t,
      annotations:(
        concatenated_attr_val:!t
      ),
      license_code:!t,
      ofvs:(
        id:!t,
        uuid:!t,
        field_id:!t,
        updater_id:!t,
        user_id:!t,
        value:!t
      ),
      project_ids:!t,
      tags:!t,
      time_observed_at:!t,
      photos:(
        id:!t,
        attribution:!t,
        license_code:!t,
        url:!t
      )
    )`.replaceAll(/\s+/g, ''),
    project_id: 'cat-coat-genes-project',
    page: 0,
    ...options,
  };

  const queryParams = new URLSearchParams(
    filterObject(
      {
        project_id: opts.project_id,
        per_page: '200', // limit is 200
        page: `${opts.page}`,
        locale: 'en-US',
        fields: opts.fields,
      },
      (_k, v) => !!v
    )
  );

  const url = `${BASE_URL_V2}/observations?${queryParams}`;

  return await httpRequest<GetProjectSpeciesResult>({ url, opts: { readAs: 'json' } });
};

const fieldIdSet = new Set<number>(SCHEMA.loci.map(locus => locus.fieldId));
const shapeObservationData = (rawData: GetProjectSpeciesResult['results']) => {
  return rawData.map(rawCat => {
    return {
      id: rawCat.uuid,
      license: rawCat.license_code,
      photo: rawCat.photos[0],
      tags: objectFromEntries(
        rawCat.ofvs
          .filter(ofv => fieldIdSet.has(ofv.field_id))
          .map(
            ofv =>
              [SCHEMA.loci.find(locus => locus.fieldId === ofv.field_id)!.slug, ofv.value] as const
          )
      ),
    };
  });
};

export const getAllObservations = async () => {
  const firstPageResults = await fetchObservationsInProject();

  if (!firstPageResults) throw new Error('Could not fetch project observations.');

  const total = firstPageResults['total_results'];
  const pagesNeeded = Math.ceil(total / 200);
  console.log(`${total} cats across ${pagesNeeded} pages.`);

  const allCats = [
    ...firstPageResults.results,
    ...(pagesNeeded > 1
      ? await Promise.all(
          Array.from({ length: pagesNeeded - 1 }).map(async (_, index) => {
            const data = await fetchObservationsInProject({ page: index + 2 });
            return data?.results;
          })
        )
      : []),
  ]
    .flat()
    .filter(notEmpty);

  return { total, cats: shapeObservationData(allCats) };
};
