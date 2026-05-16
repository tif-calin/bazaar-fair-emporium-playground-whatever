import { seededRandom } from '~/utils/random';

const OPTS = {
  kinds: [
    'heart',
    // 'star'
  ],
  colors: ['#e97c8b', '#b1e5e0', '#fce99e'],
};

export const drawIcon = (seed: string) => {
  const randNum1 = seededRandom(seed);
  const randNum2 = seededRandom(`${seed}-${randNum1}`);
  const randNum3 = seededRandom(`${seed}-${randNum2}`);

  const kind = OPTS.kinds[~~(randNum1 * OPTS.kinds.length)];

  let path = '';
  switch (kind) {
    case 'heart': {
      const wonk1 = (randNum1 - 0.5) * 6;
      const wonk2 = (randNum2 - 0.5) * 7;
      const wonk3 = (randNum3 - 0.5) * 5;

      path = `
        M0 200 v-200 h200
        a${100 + wonk1},${100 + wonk2} 90 0,1 0,${200 + wonk3 + 5}
        a${100 + wonk2 / 2 + wonk3},${100 + wonk1 - wonk2} 90 0,1 -200,${Math.abs(wonk2)}
        z
      `.trim();
    }
  }

  return {
    path,
    rotation: (randNum1 - 0.5) * 10,
    fill: OPTS.colors[~~(randNum2 * OPTS.colors.length)],
  };
};
