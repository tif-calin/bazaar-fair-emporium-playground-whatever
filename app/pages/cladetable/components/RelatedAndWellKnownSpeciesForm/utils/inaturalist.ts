import { httpRequest } from '~/utils/http';
import { filterObject } from '~/utils/object';

const BASE_URL_V2 = 'https://api.inaturalist.org/v2';

type GetNearbySpeciesResult = {
  total_results: number;
  page: number;
  per_page: number;
  results: Array<{
    count: number;
    taxon: {
      id: number;
      ancestor_ids: string[];
      default_photo: { id: number; attribution: string; license_code: string; square_url: string };
      name: string;
      preferred_common_name: string;
      rank: string;
      rank_level: number;
    };
  }>;
};

/**
 * Common ids:
 * ```
 *     1 Animals
 *     3 Birds
 * 47126 Plants
 * 47170 Fungi
 * 48460 Life
 * ```
 */
export const getNearbySpecies = async (args: {
  latitude: number;
  longitude: number;
  months?: number[];
  radius: number;
  taxon_id: number;
}) => {
  // eslint-disable-next-line max-len
  const fields = `(taxon:(ancestor_ids:!t,ancestors:(default_photo:(square_url:!t),iconic_taxon_name:!t,id:!t,is_active:!t,name:!t,preferred_common_name:!t,preferred_common_names:(name:!t),rank:!t,rank_level:!t,uuid:!t),ancestry:!t,conservation_status:(status:!t),default_photo:(attribution:!t,license_code:!t,medium_url:!t,square_url:!t,url:!t),establishment_means:(establishment_means:!t),iconic_taxon_name:!t,id:!t,is_active:!t,name:!t,preferred_common_name:!t,preferred_common_names:(name:!t),rank:!t,rank_level:!t))`;

  const queryParams = new URLSearchParams(
    filterObject(
      {
        fields,
        lat: args.latitude.toString(),
        lng: args.longitude.toString(),
        locale: 'en-US',
        month: args.months?.join(',') || '',
        per_page: '150',
        radius: args.radius.toString(),
        spam: 'false',
        taxon_id: `${args.taxon_id}`,
        verifiable: 'true',
      },
      (_k, v) => !!v
    )
  );

  const url = `${BASE_URL_V2}/observations/species_counts?${queryParams}`;

  return await httpRequest<GetNearbySpeciesResult>({ url, opts: { readAs: 'json' } });
};
