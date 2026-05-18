import type { CatCoatObservation } from './types';

/**
 * {silver} {orange}    {tortie}      {longhair}  {with white}
 * {golden} {cream}     {calico}      {shorthair}
 * {smoke}  {black}     {bicolor}
 *          {blue}      {lynx point}
 *          {chocolate} {solid point}
 *          {lilac}
 *          {cinnamon}
 *          {fawn}
 *
 * {odd-eyed}
 */
export const nameThatCat = (obs: CatCoatObservation) => {
  if (obs.colorpoint.startsWith('(c/c)')) return 'albino';
  if (obs.colorpoint.startsWith('(cᵃ/cᵃ)')) return 'blue-eyed albino';

  let name = '';

  if (obs.length.startsWith('(L/-)')) name = 'longhair';
  if (obs.length.startsWith('(l/l)')) name = 'shorthair';
  if (obs.piebald.startsWith('(W/-)')) return `white ${name}`;

  if (obs.red.startsWith('(O/O or O/Y')) name = `orange ${name}`;
  if (obs.red.startsWith('(O/o')) {
    if (obs.piebald.startsWith('(wˢ/-)')) name = `salmiak ${name}`;
    name = `tortie ${name}`;
  } else {
    console.log('TODO: white spotting');
  }

  if (obs.dilution.startsWith('(d/d)')) {
    switch (true) {
      case name.includes('orange'):
        name = name.replace('orange', 'cream');
        break;
      case name.includes('black'):
        name = name.replace('black', 'blue');
        break;
      case name.includes('chocolate'):
        name = name.replace('chocolate', 'lilac');
        break;
      case name.includes('cinnamon'):
        name = name.replace('cinnamon', 'fawn');
        break;
      default:
        name = `dilute ${name}`;
    }
  }

  return name;
};

// ———————————————————————————————————— //
// #region __TESTS__                    //

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe('nameThatCat', () => {
    const TEST_CASES = [
      {
        description:
          'Argentina dilute calico longhair https://www.inaturalist.org/observations/23891273',
        input: {
          piebald: '(wˢ/-) white spotting, medium (grades 5-6)',
          red: '(O/o) tortoiseshell',
          black: '(B/-) black',
          agouti: '(a/a) solid',
          striping: 'masked by (W/-), (wˢ/wˢ), (c/c), or (a/a)',
          dilution: '(d/d) dilute',
          silver: '(i/i) uninhibited',
          colorpoint: '(C/-) full color',
          length: '(l/l) long',
          tags: [],
        } satisfies CatCoatObservation,
        expected: 'dilute calico longhair',
      },
      // {
      //   description: '',
      // }
    ];

    TEST_CASES.forEach(testCase => {
      test(testCase.description, () => {
        const actual = nameThatCat(testCase.input);

        expect(actual, testCase.expected);
      });
    });
  });
}

// #endregion __TESTS__                 //
// ———————————————————————————————————— //
