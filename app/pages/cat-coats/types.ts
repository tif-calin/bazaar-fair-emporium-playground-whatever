/* eslint-disable max-len */

export type CatCoatObservation = {
  /** W Locus, KIT */
  piebald:
    | '(w⁺/w⁺) no white spotting'
    | '(wˢ/-) white spotting, low (grades 1-4)'
    | '(wˢ/-) white spotting, medium (grades 5-6)'
    | '(wˢ/-) white spotting, high (grades 7-10)'
    | '(W/-) dominant white'
    | 'masked by (c/c)'
    | 'cannot be determined';

  /** O Locus, SOX10 */
  red:
    | '(O/- or O/Y) red'
    | '(O/o) tortoiseshell'
    | '(o/o or o/Y) non-red'
    | 'masked by (W/-), (wˢ/wˢ), or (c/c)'
    | 'cannot be determined';

  /** B Locus, TYRP1 */
  black:
    | '(B/-) black'
    | '(b/b or b/bˡ) chocolate'
    | '(bˡ/bˡ) cinnamon'
    | 'masked by (W/-), (wˢ/wˢ), (c/c), or (O/-)'
    | 'cannot be determined';

  /** A Locus, ASIP */
  agouti:
    | '(A/-) agouti'
    | '(a/a) solid'
    | 'masked by (W/-), (wˢ/wˢ), (c/c), or (O/-)'
    | 'cannot be determined';

  /** Mc+Ti Loci */
  striping:
    | '(Tiᴬ) ticked'
    | '(Ti⁺, Mcᴹ) mackerel'
    | '(Ti⁺, Mcᴹ, Ms) spotted'
    | '(Ti⁺, mcᵇ/mcᵇ) blotched'
    | 'masked by (W/-), (wˢ/wˢ), (c/c), or (a/a)'
    | 'cannot be determined';

  /* D Locus, MLPH */
  dilution:
    | '(D/-) dense'
    | '(d/d) dilute'
    | 'masked by (W/-), (wˢ/wˢ), or (c/c)'
    | 'cannot be determined';

  /** I Locus, PMEL */
  silver:
    | '(i/i) uninhibited'
    | '(I/-) silver or smoke'
    | 'masked by (W/-), (wˢ/wˢ), or (c/c)'
    | 'cannot be determined';

  /** C Locus, TYR */
  colorpoint:
    | '(C/-) full color'
    | '(cˢ/cˢ) siamese-pointed'
    | '(cᵇ/cˢ or cˢ/cᵇ) tonkinese-mink'
    | '(cᵇ/cᵇ) burmese-sepia'
    | '(cᵃ/cᵃ) blue-eyed albinism'
    | '(c/c) pink-eyed albinism'
    | 'masked by (W/-) or (wˢ/wˢ)'
    | 'cannot be determined';

  /** L Locus, FGF5 */
  length: '(L/-) short' | '(l/l) long' | 'cannot be determined';

  tags?: Array<
    | 'agouti is charcoal (Aᵖᵇ)'
    | 'agouti is pseudomelanistic or has dark cape, high EDN3'
    | 'agouti spots are rosette (ALC ancestry)'
    | 'black coat is rusting'
    | 'caramel (Dm)'
    | 'chimera'
    | 'coat is chinchilla (Wb)'
    | 'coat is golden (i/i, Wb)'
    | 'ear is clipped'
    | 'ears are curled/folded'
    | 'eyes are deep emerald green'
    | 'eyes are dichroic'
    | 'eyes are odd'
    | 'ghost markings on solid'
    | 'lentigo freckles'
    | 'munchkin'
    | 'polydactyl'
    | 'rufousness is high'
    | 'salmiak (wˢᵃˡ)'
    | 'skunk stripes'
    | 'spotting is cap-and-saddle (grade 6-7)'
    | 'spotting is harlequin (grade 7-8)'
    | 'spotting is locket (grade 1)'
    | 'spotting is magpie (grade 9)'
    | 'spotting is mask-and-mantle (grade 5)'
    | 'spotting is mitted (grade 2)'
    | 'spotting is tuxedo (grade 3-4)'
    | 'spotting is van (grade 8-9)'
    | 'tail is rumpy/kinked (M/- or jp/jp)'
    | 'vitiligo'
  >;
};
