/* eslint-disable max-len */

export const SCHEMA = {
  __version: '4.0.1',
  loci: [
    {
      fieldId: 21112,
      slug: 'piebald',
      name: 'W & S Locus (white/piebald/spotting/KIT)',
      values: [
        '(w⁺/w⁺) no white spotting',
        '(wˢ/-) white spotting, low (grades 1-4)',
        '(wˢ/-) white spotting, medium (grades 5-6)',
        '(wˢ/-) white spotting, high (grades 7-10)',
        '(W/-) dominant white',
        'masked by (c/c)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21114,
      slug: 'red',
      name: 'O Locus (orange/red/SOX10)',
      values: [
        '(O/O or O/Y) red',
        '(O/o) tortoiseshell',
        '(o/o or o/Y) non-red',
        'masked by (W/-), (wˢ/wˢ), or (c/c)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21118,
      slug: 'black',
      name: 'B Locus (black/brown/TYRP1)',
      values: [
        '(B/-) black',
        '(b/b or b/bˡ) chocolate',
        '(bˡ/bˡ) cinnamon',
        'masked by (W/-), (wˢ/wˢ), (c/c), (O/O), or (O/Y)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21119,
      slug: 'agouti',
      name: 'A Locus (agouti/tabby/ASIP)',
      values: [
        '(A/-) agouti',
        '(a/a) solid',
        'masked by (W/-), (wˢ/wˢ), (c/c), (O/O), or (O/Y)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21120,
      slug: 'striping',
      name: 'Ti+Mc Locus (tabby patterns)',
      values: [
        '(Tiᴬ) ticked',
        '(Ti⁺, Mcᴹ) mackerel',
        '(Ti⁺, Mcᴹ, Ms) spotted',
        '(Ti⁺, mcᵇ/mcᵇ) blotched',
        'masked by (W/-), (wˢ/wˢ), (c/c), or (a/a)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21121,
      slug: 'dilution',
      name: 'D Locus (dilution/MLPH)',
      values: [
        '(D/-) dense',
        '(d/d) dilute',
        'masked by (W/-), (wˢ/wˢ), or (c/c)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21122,
      slug: 'silver',
      name: 'I Locus (silver/smoke/PMEL)',
      values: [
        '(i/i) uninhibited',
        '(I/-) silver or smoke',
        'masked by (W/-), (wˢ/wˢ), or (c/c)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21123,
      slug: 'colorpoint',
      name: 'C Locus (colorpoint/tyrosinase)',
      values: [
        '(C/-) full color',
        '(cˢ/cˢ) siamese-pointed',
        '(cᵇ/cˢ or cˢ/cᵇ) tonkinese-mink',
        '(cᵇ/cᵇ) burmese-sepia',
        '(cᵃ/cᵃ) blue-eyed albinism',
        '(c/c) pink-eyed albinism',
        'masked by (W/-) or (wˢ/wˢ)',
        'cannot be determined',
      ],
    },
    {
      fieldId: 21124,
      slug: 'length',
      name: 'L Locus (hair length/FGF5)',
      values: ['(L/-) short', '(l/l) long', 'cannot be determined'],
    },
  ],
  // field_ids: 21125, 21154, 21155
  tags: [
    'agouti is charcoal (Aᵖᵇ)',
    'agouti is pseudomelanistic or has dark cape, high EDN3',
    'agouti spots are rosette (ALC ancestry)',
    'black coat is rusting',
    'caramel (Dm)',
    'chimera',
    'coat is chinchilla (Wb)',
    'coat is golden (i/i, Wb)',
    'ear is clipped',
    'ears are curled/folded',
    'eyes are deep emerald green',
    'eyes are dichroic',
    'eyes are odd',
    'ghost markings on solid',
    'lentigo freckles',
    'munchkin',
    'polydactyl',
    'pregnant',
    'rufousness is high',
    'salmiak (wˢᵃˡ)',
    'skunk stripes',
    'spotting is cap-and-saddle (grade 6-7)',
    'spotting is harlequin (grade 7-8)',
    'spotting is locket (grade 1)',
    'spotting is magpie (grade 9)',
    'spotting is mask-and-mantle (grade 5)',
    'spotting is mitted (grade 2)',
    'spotting is tuxedo (grade 3-4)',
    'spotting is van (grade 8-9)',
    'tail is rumpy/kinked (M/- or jp/jp)',
    'vitiligo',
  ],
  guide: `
## Primary Loci
Cat coat genetics are usually organized into a few central genes or "loci" that are responsible for most observable traits. This guide organizes it into 9 primary traits that we think are the most important for feral/wild cats. It's important to note there are several other genes and traits that are important to breeders but are practically non-existant in the wild.

{{TOC}}

### W+S Locus (white/piebald/spotting/KIT)
A W/- ("dominant white") cat is the most common white cat though less than 5% of feral cats are (W/-). This gene prevents the migration of pigment cells during embryonic development. W/- cats will often have blue or odd eyes and be deaf or partially deaf on the side of the blue eye. Nose leather and paw pads will be bubblegum pink and the skin through the fur should be a pale pink. If the nose leather has a black outline, a brown spot, or is entirely slate grey/liver colored, the cat is NOT "Dominant White" (W/-) — it is a "High-White Spotted" (S¹⁰) cat or a very very pale Cream/Red (O/-, d/d) cat. Older red (O/-) cats develop freckles on the nose/lips while (W/-) cats do not. The other two—much less common—genotypes for a white cat are pointed cats and albino cats (both related to the C-Locus). W/- kittens may be born with some color on the head that fades away after a year or so. Traditionally, the W-Locus and the S-Locus (piebald or white spotting) were treated as separate loci, but recent research has shown they both act on the KIT gene and make up a single locus which also includes Birman gloving (wᵍ). The dominance hierarchy then being (W/- > wˢ > wᵍ > w⁺). The wˢ allele is extremely variable in expression and interacts with several potential modifier genes. Although a (wˢ/w⁺) will typically exhibit less white spotting than a (wˢ/wˢ) cat, this cannot be reliably determined from visual ID. The Neil Todd grading scale from 1 to 10 is commonly used to grade the white spotting (from low to high), but we've grouped the grades here into "low" (e.g. locket, mitted, or tuxedo), "medium" (e.g. mask-and-mantle, pied, cap-and-saddle), and "high" (e.g. cap-and-saddle, harlequin, van, magpie) for simplicity. The line between a tortie and a calico is usually around grade 5 (sometimes referred to as a tortico). Even the most extreme white spotting usually has the tiniest speck of color between the ears or on the tail—a key feature from distinguishing W/- cats from wˢ¹⁰ cats.

### O Locus (orange/red/SOX10)
This determines whether a cat produces phaeomelanin (red pigment) or eumelanin (black/brown pigment). It is caused by a tandem duplication in the SOX10 gene which forces a pigment switch to phaeomelanin. It is X-linked so most males can only have a single copy of it (either O/Y or o/Y) while females can exhibit O/o leading to a mosaic (tortoiseshell/calico) coat. Note that calicos are tortoiseshells with white spotting genes that cause the orange/black cells to clump together into large distinct spots. Orange (O/-) epistatically masks the non-agouti (a/a) genotype making it difficult to tell the A-Locus of an orange cat. An agouti orange (O/-, A/-) can sometimes be distinguished from a "solid" orange (O/-, a/a) by checking the leather. An agouti orange will have a pale/white rim around the nose leather and lips while the non-agouti will lack this rim. For torties, you can also check the black patches as they will only exhibit striping/ticking if they are agouti. Male torties are less than 1 in 3,000 and can only happen due to XXY chromosomes or embryos that have fused (chimeras). The shade of orange may also vary from a sandy yellow to a deeper red. This is separate from dilution (D-Locus) and is caused by a complex interaction with "rufous" polygenes (rufousness can also affect non-orange cats). For this schema, these are all treated as orange. Please note that Dominant White (W/-) masks the O-Locus completely. Orange cats can be 15-30% of the feral population and are much more common in urban than in rural populations. Orange is associated with the "Lentigo Simplex" which are harmless black freckles on the nose leather, lips, and eye rims that appear at around 1-2 years of age. Note that lentigo freckles are never raised. Severe lentigo can occasionally make the nose leather look black. The sexual dimorphism between orange cat sexes is greater than in any other color group. Orange cats almost never have deep green eyes and usually range from hazel to copper/gold.

### B Locus (black/brown/TYRP1)
This locus codes for the tyrosinase enzyme affecting protein-1 (TYRP1) which affects the shape of the eumelanin (black/brown pigment). The dominant type (B/-) leads to spherical granules and appear as black fur. The b mutation turns the granules ovular and lead to chocolate fur while the rod-shaped granules caused by bˡ are exhibited as cinnamon color. The hierarchy is B > b > bˡ. The O gene replaces all eumelanin with pheomelanin which means the B Locus is impossible to determine for orange cats. Chocolate is rare and cinnamon is extremely rare in feral populations and many observers confuse the "rusting" phenomenon for chocolate fur. Rusting happens due to a tyrosine deficiency (diet) along with exposure to sunlight. The best way to rule out rusting is to check the root of the fur which will not have changed color as much or check the nose leather/paw pads which should be black for B/-, pinkish-brown for b, and reddish-pink for bˡ. Please note that these categories account for dilution and grey/blue cats should be annotated as (B), lilac should be annotated as (b), and fawn should be annotated as (bˡ). B cats have higher nutritional needs, requiring more intake of amino acids like tyrosine. B can affect pigment density in the iris stroma and is correlated with copper, orange, or deep gold eyes. B/- along with a/a may be associated with more robust immune systems.

### A Locus (agouti/tabby/ASIP)
The Agouti signaling protein (ASIP) acts as a "switch" for tabby patterns. Within a hair follicle it switches between eumelanin (black) and phaeomelanin (red) production. Solid cats may have the coding for a specific tabby pattern but (a/a) masks this pattern. Agouti cats can be 70-90% of a feral population though non-agouti is more common in urban settings. Solid kittens will still be born with "ghost stripes" that fade later as the (a/a) kicks in. Sometimes a solid black cat with the I gene can look like a tabby when they move and the white undercoat peeks through. Agouti noses are terracotta brick colored with a distinct rim of the primary pigment. They also usually have a pale "spectacle" area around the eyes and a light-colored patch of fur on the back of the ears (a "thumbprint").

### Ti+Mc Locus (tabby patterns)
Tabby patterns are quite complex and not governed by a single locus. 99.9% of feral tabby cats can be grouped into four basic patterns: mackerel, blotched (aka classic), spotted, and ticked. There are two main loci at work here. The tabby locus (Mc) is actually the Taqpep gene which determines the frequency and regularity of the waves in the pattern. When it functions properly it results in the mackerel (Mcᴹ) allele. The (mcᵇ) allele is a mutated Taqpep that causes the waves to lose their regularity and expand and merge—resulting in the classic/blotched pattern. However, the ticking Locus (Ti) is epistatic over the tabby locus. The ticked locus is actually the gene DKK4. The wild type (Ti⁺) is when DKK4 is functional and the stripes can show. But a mutation on DKK4 (Tiᴬ) causes it to malfunction and result in the thick skin zones not differentiating properly and leading to the salt-and-pepper fur. Spotted cats are actually mackerel cats (Mcᴹ) with some sort of separate modifier gene (Ms) that interrupts the stripes into smaller segments. The Ms gene is likely a polygene and should be thought of more as a spectrum than an on/off switch with mackerel on one end, spotted on the other, and broken mackerels somewhere in between. Cats may not fall neatly into one bucket or the other. If stripes are broken into unconnected segments for more than 50% of the body, choose "spotted". Mackerel cats make up 60-70% of the global wild population of tabbies; about 5-10% are spotted; and about 20-30% are blotched (though this is highly regional). Ticked cats makeup a small percentage globally but can be nearly 100% of the population in certain areas. They are most common in Southeast Asia and least common in Northern Europe and Siberia.

### D Locus (dilution/MLPH)
This works on the MLPH gene which controls the transport of pigment granules (melanosomes) into the growing hair shaft. When the (d/d) mutation happens the granules clump together, leaving large gaps of empty space in the hair shaft. As a result, the pigments appear "dilute": black → blue, red → cream, chocolate → lilac, cinnamon → fawn. In wild populations, (d/d) is most common in France, the UK, and western US. Note that kittens may be born with a "fever coat" which is usually a result of their mother being sick during pregnancy. This fades as they grow but can sometimes look like a dilute coat. The best way to differentiate them is by checking the nose leather. Note that there is a related theoretical locus called the Dilute Modifier (Dm) Locus which can result in something called "caramelization" or "double-dilution". It only acts on (d/d) cats and turns blue to caramel, lilac to taupe, and cream to apricot. It is basically non-existent in feral populations.

### I Locus (silver/smoke/PMEL)
The dominant (I) allele suppresses production of pigment at the base of the hair leaving only the tips colored. It acts much more aggressively on phaeomelanin (red) than on eumelanin (black). Agouti cats with this tipping are called "silver" while solid cats are called "smoke". Orange cats may be called "cameos". The effect on both red and black pigments can be seen in torties/calicos. In feral populations, (I/-) cats often exhibit "tarnishing" due to interactions between rufous genes and the silver gene. This is where patches of yellow/brown break through on the nose leather, paw pads, and down the dorsal stripe. Tarnishing is undesirable in show cat. Note that in show cats there is another important locus called the wideband (Wb) locus (likely polygenic) which interacts with this effect. It pushes up color without necessarily bleaching the base. For (i/i) cats, this can push the black pigment up and leave the base yellow resulting in "golden" cats. In silver cats, when the Wb is very strong, the pigment is pushed to only the top 1/8th creating a sparkling effect called "chinchilla" or "shell". Also note that two copies of I (I/I) produce a more intense silver effect. I/- cats are most common in France and the UK and least common in Asia and South America. Overall they make up between 0-5% of the feral population and are more common in urban areas.

### C Locus (colorpoint/tyrosinase/TYR)
This is a very multi-faceted locus that primarily acts on the TYR gene. The mutation on this gene makes the tyrosinase enzyme (responsible for making melanin) temperature-sensitive. As a result, the fur in the warm parts of the body lacks pigment while the cold parts (ears, tail, paws, nose) have their normal pigmentation. The allele hierarchy is more complex because there are two alleles that are incompletely dominant with each other making them blend together: C > (cᵇ = cˢ) > cᵃ > c. In Burmese/Sepia (cᵇ), the enzyme is only slightly paler than the points and the eye color is yellow/gold, not blue. In Siamese/Pointed (cˢ), the enzyme is strongly temperature sensitive and there is an obvious contrast between warm/cold parts of the body. Eye color is always blue. When cᵇ and cˢ are present, we get Mink/Tonkinese which is somewhere in between. Eye color is usually "aqua" (green-blue). With Blue-Eyed Albino (cᵃ), there is very minimal pigment and eye color is a pale blue with a red flash. Pink-eyed albino results in a total lack of tyrosinase and the cat is completely albino. Eyes are pink and the blood vessels are visible. cˢ is surprisingly common due to the popularity of Siamese cats but cᵇ is rare outside of Southeast Asia. Albinos are exceedingly rare. Pointed cats are often cross-eyed resulting in a slight visual impairment. Blue-eyed pointed cats often lack a Tapetum Lucidum—resulting in reduced night vision. Their eyes reflect red instead of green in a flashlight beam. Because the pointed gene inhibits pigment on the body it can allow "ghost markings" to show up clearly on the face or tail of a solid cat.

### L Locus (hair length/FGF5)
This locus is actually the FGF5 gene which tells hair when to stop growing and shed. The (l/l) genotype breaks the gene and allows the hair to keep growing. There are actually at least 5 different mutations that result in what we call (l/l). We group them together because they cannot be distinguished visually. Medium-length hair should be considered a variation of longhair. The most reliable way to tell is by the fluffiness of the tail. L/- cat hair lies flat like a tapered snake while l/l will plume (bottle brush) and will almost always have tufts of hair growing between the toes. In the wild, (l/l) cats are common along Viking routes since sailors kept longhair cats as mousers and for warmth. Rex/curly hair has to do with the KRT71 or LPAR6 genes and is separate from the L-Locus.

## Additional Topics

### Amber
tk

### EDN3
While Taqpep (Mc Locus) controls the frequency of the stripes (mackerel = high frequency, blotched = low frequency), EDN3 (Endothelin 3) controls how thick the stripes are. High EDN3 results in coalescing. In blotched tabbies, this result is called "pseudo-melanism". In mackerel tabbies, the vertical ribs merge to form a "dark cape" or saddle.

### Mocha (cᵐ)
tk

### Rosetting
Rosetted spots such as those seen on Bengal breeds is not due to a single gene. Instead it is a combination of Aᵖᵇ, Mc, and specific modifers that delay pigmentation. Some research also indicates it might require two copies of the spotting modifier (poly)genes. Genetically these cats are actually a modification of blotched/classic (Ti⁺, mcᵇ/mcᵇ) rather than "spotted" (which is itself a modification of mackerel stripes).

Normally tabbies have two colors (spotting and ground color) but rosetted cats also have a color for the center of the spots that differs from the outline. The mutation required to create this third color seems to be unique to Aᵖᵇ which originates from the Asian Spotted Cat.

### Rufousness
Rufousness is basically how "red" the red pigment (phaeomelanin) is. It is not a single gene but a complex interaction of several genes that forms a spectrum. In "low rufous", the red appears as pale beige, sandy yellow, or cool drab. Orange cats are often called "sandy" or "ginger" while the ground color of tabbies is called "drab" or "cold" (greyish-beige). In "high rufous", the red appears deep mahogany, rich copper, or apricot. Orange cats are described as a "deep red" while the ground color of tabbies is "golden" or "warm" with a glowing orange belly/face.

There are a number of factors that can be confused with rufousness:

- The CORIN gene (Wb Locus) widens the yellow band on the agouti hair shaft leading to a "golden"   or "sunshine" effect that can be mistaken for high rufousness.
- Likewise the MC1R gene (E Locus) causes black pigment to be replaced by red pigment as the cat ages. The e allele is unique to the Norwegian Forest Cat breed and the eʳ allele is unique to the Burmese breed.
- Dilution can also be confused for rufousness (the nose leather is the best differentiator).
- Caramelization (Dm Locus) aka double-dilution is best differentiated in tabbies by contrasting the stripes. Caramelized stripes are very low contrast.
- Black cats can undergo "rusting" (sun bleaching) when tyrosine deficient.

### Tailless genes
There are a couple distinct mutations which lead to a tailless cat, including one that is lethal. The Manx mutation (M Locus, TBXT) is lethal when homozygous (M/M), but (M/m⁺) results in no tail or a short tail with high variability in expression (graded as rumpy, stumpy, and longy). Because the gene shortens the spine, it can shorten it too much and cause spina bifida, paralysis of the hind legs, and incontinence. The Japanese Bobtail mutation (Jp locus, HES7) causes the tail vertebrae to misshape and fuse, creating a kinked "pom-pom" shape. It is not lethal and it is recessive (jp/jp). There are also dominant tail mutations found in American feral populations (American Bobtail/Pixie-Bob). Most of them seem to be the Manx gene (TBXT) or some novel allele of it. They usually have tails that are 50% length (hock length) and don't have spinal issues.
  `.trim(),
} as const;

export type CatCoatObservation = {
  /** W Locus, KIT */
  piebald: (typeof SCHEMA)['loci'][0]['values'][number];

  /** O Locus, SOX10 */
  red: (typeof SCHEMA)['loci'][1]['values'][number];

  /** B Locus, TYRP1 */
  black: (typeof SCHEMA)['loci'][2]['values'][number];

  /** A Locus, ASIP */
  agouti: (typeof SCHEMA)['loci'][3]['values'][number];

  /** Mc+Ti Loci */
  striping: (typeof SCHEMA)['loci'][4]['values'][number];

  /* D Locus, MLPH */
  dilution: (typeof SCHEMA)['loci'][5]['values'][number];

  /** I Locus, PMEL */
  silver: (typeof SCHEMA)['loci'][6]['values'][number];

  /** C Locus, TYR */
  colorpoint: (typeof SCHEMA)['loci'][7]['values'][number];

  /** L Locus, FGF5 */
  length: (typeof SCHEMA)['loci'][8]['values'][number];

  tags?: Array<(typeof SCHEMA.tags)[number]>;
};

const LocusSlugSet = new Set<string>(SCHEMA.loci.map(locus => locus.slug));
export type LocusSlug = (typeof SCHEMA)['loci'][number]['slug'];
export const isLocusSlug = (str: string): str is LocusSlug => LocusSlugSet.has(str);
