import { httpRequest } from '~/utils/http';

/**
 * API docs: https://github.com/OpenTreeOfLife/germinator/wiki/Open-Tree-of-Life-Web-APIs
 */
const BASE_URL = 'https://api.opentreeoflife.org/v3';

type GetLineageOpts = {
  /** @default "arguson" */
  format: 'arguson' | 'newick';
};

type ArgSon = {
  extinct: boolean;
  lineage: Array<Omit<ArgSon, 'lineage'>>;
  node_id: string;
  num_tips: number;
  taxon?: { name: string; ott_id: number; rank: string };
};

type SubtreeResponse = { synth_id: string; newick: string } | { synth_id: string; arguson: ArgSon };

export const getLineage = async (ottId: string, opts?: Partial<GetLineageOpts>) => {
  const { format = 'arguson' } = opts || {};

  return await httpRequest<SubtreeResponse>({
    url: `${BASE_URL}/tree_of_life/subtree`,
    init: {
      method: 'POST',
      body: JSON.stringify({
        format,
        height_limit: -1,
        node_id: ottId,
        synth_id: undefined,
      }),
    },
    opts: { readAs: 'json' },
  });
};

/**
 * @link https://github.com/OpenTreeOfLife/germinator/wiki/Synthetic-tree-API-v3#induced_subtree
 */
export const getInducedSubtree = async (ottIds: string[]) => {
  return await httpRequest<{ newick: string }>({
    url: `${BASE_URL}/tree_of_life/induced_subtree`,
    init: {
      method: 'POST',
      body: JSON.stringify({
        ott_ids: ottIds,
        synth_id: undefined,
      }),
    },
    opts: { readAs: 'json' },
  });
};

type ResolvedNameResult = Array<{
  is_suppressed: boolean;
  unique_name: string;
  ott_id: number;
  is_higher: boolean;
}>;

/**
 * @link https://github.com/OpenTreeOfLife/germinator/wiki/TNRS-API-v3#autocomplete_name
 *
 * See also: match_names
 */
export const getResolvedName = async (name: string) => {
  return await httpRequest<ResolvedNameResult>({
    url: `${BASE_URL}/tree_of_life/tnrs/autocomplete_name`,
    init: {
      method: 'POST',
      body: JSON.stringify({
        name,
        context_name: 'All life',
        include_suppressed: 'False',
      }),
    },
    opts: { readAs: 'json' },
  });
};
