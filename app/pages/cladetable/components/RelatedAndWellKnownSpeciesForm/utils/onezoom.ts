import { httpRequest } from "~/utils/http";

type OneZoomPopularityListResult = {
  header: Record<string, number>;
  max_taxa_in: number;
  max_taxa_out: number;
  tot_spp: number;
  n_taxa: number;
  data: Array<
    [
      ottid: number,
      popularity: number,
      popularity_rank: number,
      raw_popularity?: number,
      name?: string
    ]
  >;
};

/**
 * API docs: https://www.onezoom.org/popularity
 */
const BASE_URL = "https://corsproxy.io/https://www.onezoom.org/popularity/list";

type GetPopularityListOpts = {
  key: string;
  max: number;
};

export const getPopularityList = async (
  ottIds: (string | number)[],
  opts: Partial<GetPopularityListOpts> = {}
) => {
  const { max = 100, key = "0" } = opts;

  const otts = ottIds.join(",");

  const queryParams = new URLSearchParams({
    key,
    otts,
    expand_taxa: "True",
    max: `${key === '0' ? Math.max(max, 100) :max}`,
    names: "True",
    include_raw: "True",
    sort: "raw",
  });

  const url = `${BASE_URL}?${queryParams}`;

  return await httpRequest<OneZoomPopularityListResult>({
    url,
    opts: { readAs: "json" },
  });
};
