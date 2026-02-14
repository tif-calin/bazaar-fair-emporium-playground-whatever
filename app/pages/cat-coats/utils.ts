import type { CatCoatObservation } from './types';

export const nameThatCat = (obs: CatCoatObservation) => {
  if (obs.piebald.startsWith('(W/-)')) return 'white';

  return null as never;
};
