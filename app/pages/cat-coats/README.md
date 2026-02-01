# cat-coats project
This is my attempt to make a scientifically-motivated schema for classifying cat coats.

The initial motivation was that I wanted to create a project and some relevant [Observation Fields](https://www.inaturalist.org/observation_fields) to track the geographic distribution of coat patterns.

The most incredible source I've found for this loci-based approach is here: http://messybeast.com/gene-loci.htm.

## links

- view iNaturalist observations here https://www.inaturalist.org/observations?taxon_id=118552&term_id_or_unknown=17&without_term_value_id=19
- the most thorough summary of locus-based classification of cat coats http://messybeast.com/gene-loci.htm
- Wikimedias's color-based classification is pretty good for finding examples https://commons.wikimedia.org/wiki/Category:Cats_by_colour

## terms/glossary
- torbie
- tortie
- calico

- solid point
- lynx point

- silver
- smoke


## version 2

```ts
type INatObservationField = {
  name: string;
  description?: string;
  datatype: 'text' | 'numeric' | 'date' | 'taxon' | 'dna';
  allowedValues: string;
};

const NEW_FIELDS: INatObservationField[] = [
  {
    name: 'Cat Coat Genes: W (dominant white) Locus',
    description: 'A Dominant White (W/-) cat is the most common white cat. This gene prevents the migration of pigment cells during embryonic development. W/- cats will usually have blue or odd eyes and be deaf or partially deaf on the side of the blue eye. Nose leather and paw pads will be bubblegum pink and the skin through the fur should be a pale pink. If the nose leather has a black outline, a brown spot, or is entirely slate grey/liver colored, the cat is NOT "Dominant White" (W/-) — it is a "High-White Spotted" (S¹⁰) cat or a very pale Cream/Red (O/-, d/d) cat. Older red (O/-) cats develop freckles on the nose/lips while (W/-) cats do not. The W-Locus and the S-Locus both act on the KIT gene. Less than 5% of feral cats are (W/-). The other two—much less common—genotypes for a white cat are pointed cats and albino cats (both related to the C-Locus). W/- kittens may be born with some color on the head that fades away after a year or so.',
    datatype: 'text',
    allowedValues: '(w⁺/w⁺) normal|(W/-) dominant white',
  },
  {
    name: 'Cat Coat Genes: S (piebald/white spotting) Locus',
    description: 'New research has shown that this locus actually acts on the same gene (KIT) as the W locus with the W allele being the most dominant (W/- > wˢ > w⁺ > wᵍ). However the wˢ allele is extremely variable. Usually having a single copy of the gene leads to less white spotting than having two copies but this is often not the case. Extreme white spotting can even result in a completely white cat making it difficult to determine if the cat is W/- or Wˢ/Wˢ. In addition, a separate allele for Birman gloving, wᵍ, has been identified but is hard to visually ID. For these reasons we stick with the somewhat dated S-Locus concept. Specifically we use the Neil Todd grading scale from S¹ to S¹⁰. The spotting patterns can result in common patterns that are sometimes named. From low to high grade some of these named patterns include: locket, mitted, tuxedo, mask-and-mantle, cap-and-saddle, magpie, harlequin, pied, and van. Calicos and Torties are usually split around S⁵ with S⁵ sometimes being called a Tortico. Even the most extreme white spotting often has the tiniest spec of color between the ears or on the tail—a key feature for distinguishing S¹⁰ from W.',
    datatype: 'text',
    allowedValues: 'S¹|S²|S³|S⁴|S⁵|S⁶|S⁷|S⁸|S⁹|S¹⁰'
  },
  {
    name: 'Cat Coat Genes: O (orange/red) Locus',
    description: 'This determines whether a cat produces phaeomelanin (red pigment) or eumelanin (black/brown pigment). It is X-linked so most males can only have a single copy of it (either O/Y or o/Y) while females can exhibit O/o leading to a mosaic (tortoiseshell/calico) coat. Note that calicos are tortoiseshells with white spotting genes that cause the orange/black cells to clump together into large distinct spots. Orange (O/-) epistatically masks the non-agouti (a/a) genotype making it difficult to tell the A-Locus of an orange cat. An agouti orange (O/-, A/-) can sometimes be distinguished from a "solid" orange (O/-, a/a) by checking the leather. An agouti orange will have a pale/white rim around the nose leather and lips while the non-agouti will lack this rim. For torties, you can also check the black patches as they will only exhibit striping/ticking if they are agouti. Males torties are less than 1 in 3,000 and can only happen due to XXY chromosomes or embryos that have fused (chimeras). The shade of orange may also vary from a sandy yellow to a deeper red. This is separate from dilution (D-Locus) and is caused by a complex interaction with "Rufous" polygenes. For this schema, these are all treated as orange. Please note that Dominant White (W/-) masks the O-Locus completely. Orange cats can be 15-30% of the feral population and are much more common in urban than in rural populations. Orange is associated with the "Lentigo Simplex" which are harmless black freckles on the nose leather, lips, and eye rims that appear at around 1-2 years of age. Severe lentigo can occasionally make the nose leather look black. The sexual dimorphism between orange cat sexes is greater than in any other color group. Orange cats almost never have deep green eyes and usually range from hazel to copper/gold.',
    datatype: 'text',
    allowedValues: '(O/- or O/Y) red|(O/o) tortoiseshell|(o/o or o/Y) non-orange'
  },
  {
    name: 'Cat Coat Genes: B (black/brown) Locus',
    description: 'This locus codes for the tyrosinase enzume affecting protein-1 (TYRP1) which affects the shape of the eumelanin (black/brown pigment). The dominant type (B/-) leads to spherical granules and appear as black fur. The b mutation turns the granules ovular and lead to chocolate fur while the rod-shaped granules caused by bˡ are exhibited as cinnamon color. The hierarchy is B > b > bˡ. The O gene replaces all eumelanin with pheomelanin which means the B Locus is impossible to determine for orange cats. Chocolate is rare and cinnamon is extremely rare in feral populations and many observers confuse the "rusting" phenomenon for chocolate fur. Rusting happens due to a tyrosine deficiency (diet) along with exposure to sunlight. The best way to rule out rusting is to check the root of the fur which will not have changed color as much or check the nose leather/paw pads which should be black for B/-, pinkish-brown for b, and reddish-pink for bˡ. Please note that these categories account for dilution and grey/blue cats should be annotated as (B), lilac should be annotated as (b), and fawn should be annotated as (bˡ). B cats have higher nutritional needs, requiring more intake of amino acids like tyrosine. B can affect pigment density in the iris stroma and is correlated with copper, orange, or deep gold eyes. B/- along with a/a is associated with more robust immune systems.',
    datatype: 'text',
    allowedValues: '(B/-) black|(b/b or b/bˡ) chocolate|(bˡ/bˡ) cinnamon'
  },
  {
    name: 'Cat Coat Genes: A (agouti/tabby) Locus',
    description: 'The Agouti signaling protein (ASIP) acts as a "switch" for tabby patterns. Within a hair follicle it switches between eumelanin (black) and phaeomelanin (red) production. Solid cats may have the coding for a specific tabby pattern but (a/a) masks this pattern. Agouti cats can be 70-90% of a feral population though non-agouti is more common in urban settings. Solid kittens will still be born with "ghost stripes" that fade later as the (a/a) kicks in. Sometimes a solid black cat with the I gene can look like a tabby when they move and the white undercoat peeks through. Agouti noses are terracota brick colored with a distinct rim of the primary pigment. They also usually have a pale "spectacle" area around the eyes and a light-colored patch of fur on the back of the ears (a "thumbprint").',
    datatype: 'text',
    allowedValues: '(A/-) agouti|(a/a) solid'
  },
  {
    name: 'Cat Coat Genes: Agouti Patterns (not a single locus)',
    description: 'Tabby patterns are quite complex and not governed by a single locus. 99.9% of feral tabby cats can be grouped into four basic patterns: mackerel, blotched (aka classic), spotted, and ticked. There are two main loci at work here. The tabby locus (Ta) is actually the Taqpep gene which determines the frequency and regularity of the waves in the pattern. When it functions properly it results in the mackerel (Taᴹ) allele. The (taᵇ) allele is a mutated Taqpep that causes the waves to lose their regularity and expand and merge—resulting in the classic/blotched pattern. However, the ticking Locus (Ti) is epistatic over the tabby locus. The ticked locus is actually the gene DKK4. The wild type (Ti⁺) is when DKK4 is functional and the stripes can show. But a mutation on DKK4 (Tiᴬ) causes it to malfunction and result in the thick skin zones not differentiating properly and leading to the salt-and-pepper fur. Spotted cats are actually mackerel cats (Taᴹ) with some sort of separate modifier gene that interrupts the stripes into smaller segments so we group spotted with mackerel here. Note that a "true spotted" cat like the Ocicat is actually taᵇ/taᵇ with modifiers but these are not found in feral populations. Ticked cats are most common in Southeast Asia and least common in Northern Europe and Siberia.',
    datatype: 'text',
    allowedValues: '(Tiᴬ) ticked|(Ti⁺, Taᴹ) mackerel or spotted|(Ti⁺, taᵇ/taᵇ) blotched'
  },
  // TODO: D-Locus
  // TODO: I-Locus
  // TODO: C-Locus
  // TODO: L-Locus, KRT71-Locus
  {
    name: 'Cat Coat Genes: additional optional non-exclusive tags',
    description: 'This is a list of other possibly notable observations that may either be rare, developmental, or not have a clear genetic underpinning.',
    datatype: 'text',
    allowedValues: 'agouti is charcoal (Aᵖᵇ)|chimera|eyes are odd|lentigo freckles|agouti spots are rosette|orange is rufous|polydactyl|skunk stripes (thai white spotting)|spotting is cap-and-saddle (grade 6-7)|spotting is harlequin (grade 7-8)|spotting is locket (grade 1)|spotting is magpie (grade 9)|spotting is mask-and-mantle (grade 5)|spotting is mitted (grade 2)|spotting is tuxedo (grade 3-4)|spotting is van (grade 8-9)|tortico',
  },
];
```

## version 1

```ts
type CatCoat = Partial<{
  /**
   * O-Locus: Sex-linked pigment.
   * (O/o) is female-only.
   * Orange (O) is epistatic over non-agouti (a/a), so orange almost always show tabby markings.
   * Copper/gold eyes are associated with (O).
   */
  orange: 'non-orange (o/o or o/Y)' | 'orange (O/O or O/Y)' | 'tortie-calico (O/o)';

  /**
   * B-Locus: Mutations of the black pigment (eumelanin).
   * NOTE: If the cat is (O/-), this can only be assesed by the leather (nose/paws).
   */
  primaryColor: 'black (B/-)' | 'chocolate (b/b)' | 'cinnamon (bl/bl)';

  /** A-Locus: Presence of pattern. No way to tell if (O/-). Tabbies have "M" on forehead. */
  agouti: 'solid (a/a)' | 'tabby (A/-)';

  /**
   * Tabby Locus: Marking shape. (Ti > Mc > tb).
   * Not actually a single locus.
   * NOTE: Only visible if agouti (A/-) or orange (O).
   */
  tabby:
    | 'ticked (Ti/-)'
    | 'mackerel (Mc/-)' // including broken mackerel
    | 'classic/blotched (tb/tb)'
    | 'spotted (Sp/-)' // theoretical. Actually a polygenic modification of mackerel
  ;

  /** D-Locus: Pigment density. (d/d) turns black/red to blue/cream. */
  dilution: 'dense (D/-)' | 'dilute (d/d)';

  /**
   * S-Locus: The 1-9 Piebald Scale (Neil Todd scale).
   * s/s is Grade 0; S/s is usually 1-5; S/S is usually 6-9.
   * Higher grades are frequently associated with blue/odd-eyes and potential deafness.
   * NOTE: it can be difficult or impossible to tell certain grades if a cat is pointed.
   */
  whiteSpotting: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  /** I-Locus: Pigment inhibitor. turns agouti/solid to silver/smoke. High correlation with green eyes. */
  inhibitor: 'smoke-silver (I/-)' | 'none (i/i)';

  /**
   * C-Locus: Temperature-sensitive albinism.
   * Siamese (cs/cs) = blue eyes; Tonkinese (cb/cs) = aqua. Burmese (cb/cb) = yellow/gold. Albino (c/c) = pink or (ca/ca) = blue.
   * Pink-eyed albinism is associated with deafness. Blue-eyed albinism may have light sensitivity or shaky eyes.
   */
  pointed: 'none (C/-)' | 'siamese-pointed (cs/cs)' | 'tonkinese-mink (cb/cs)' | 'burmese-sepia (cb/cb)' | 'albino (c/c or ca/ca)';

  /** FGF5-Locus: basic length */
  'hair.length': 'shorthair (L)' | 'longhair (l)';

  /**
   * KRT71 Locus: texture and volume. Mutually-exclusive.
   * Hierarchy: Selkirk (Se) > Normal (+) > Devon (re) > Sphynx (hr)
   */
  'hair.krt71': 'normal' | 'selkirk-rex (Se)' | 'devon-rex (re)' | 'sphynx-hairless (hr)';

  additionalTags: (
    | 'amber (e/e)' // E-Locus (MC1R)
    | 'birman-gloving'
    | 'caramel (Dm)' // aka double-dilution, blue-caramel=taupe, lilac-caramel=caramel, fawn-caramel=caramel, cream-caramel=apricot. Nose and paw pads turn metallic mauve or plum color.
    | 'carnelian' // E-Locus (MC1R)
    | 'chimera'
    | 'ears::curled'
    | 'ears::folded'
    | 'ears::four'
    | 'glitter/mica'
    | 'hair.texture::cornish-rex (LPAR6/r)'
    | 'hair.texture::laperm (Lp)'
    | 'hair.texture::wirehair (Wh)'
    | 'hair.texture::lykoi (HR)'
    | 'polydactyl'
    | 'roaning/karpati'
    | 'russet (ru/ru)' // E-Locus (MC1R)
    | 'satin'
    | 'spotting::sheeted'
    | 'spotting::skunk'
    | 'spotting::swirled'
    | 'spotting::moscow (Wm)'
    | 'tail::bobtail'
    | 'tail::kinky'
    | 'tail::tailless'
    | 'tail::stumpy'
    | 'white' // can either be (W/-) or, most often, extreme white spotting (S10). (W/-) is associated with blue/odd eyes and deafness
    | 'wide-band (Wb)' // incl. golden, sunshine (sh/sh), copper/akita/flaxen (Au), and chinchilla
  )[];
}>;
```

### key

Question 1: base pattern
- white
  - dominant white
  - extreme white spotting
  - albino
- non-white
  - red
  - tortie-calico
    - tortie (grades 0-3)
    - tortico (grade 4)
    - calico (grade 5-9)
  - non-red
    - black
    - cinnamon
    - chocolate

white
red
tortie
calico
black
cinnamon
chocolate

Question 2: dilution
red --> cream
black --> blue
chocolate --> lilac
cinnamon --> fawn

Question 3: striping

Question 4: white spotting and colorpoint
