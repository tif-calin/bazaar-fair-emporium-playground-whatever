import { styled } from '@linaria/react';
import React from 'react';
import PhylogeneticCladeTable from './components/PhylogeneticCladeTable';
import ToolBar from './components/ToolBar';
import FromNewickAndCsv from './components/CladeTable/components/FromNewickAndCsv';
import { prepareFromString } from './components/PhylogeneticCladeTable/utils/prepareNewickTree';

const bgSvg = btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
  <filter id="noise" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="5" stitchTiles="stitch"/>
    <feBlend mode="screen"/>
  </filter>
  <filter id="noise2" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="2" stitchTiles="stitch"/>
    <feBlend mode="screen"/>
  </filter>
  <rect width="500" fill="var(--clr-bg)" height="500" filter="url(#noise)" opacity="0.45"/>
  <rect width="500" fill="var(--clr-bg)" height="500" filter="url(#noise2)" opacity="0.1"/>
</svg>
`);

const Page = styled.div`
  --clr-focus: var(--oc-orange-4);
  --msr-radius: 0.15rem;
  --msr-input-height: 28px;

  background-image: url("data:image/svg+xml;base64,${bgSvg}");
  display: flex;
   align-items: center;
   flex-direction: column;
   gap: 0.5rem;
  margin: auto;
  min-height: calc(100vh - 2rem);
  padding: 1rem;
  position: relative;

  & > *:where(header, main):not(:empty) {
    background-color: var(--clr-fg);
    border: 1px solid var(--clr-line);
    border-radius: var(--msr-radius);
    border-bottom: 4px double var(--clr-line);
    padding: 1rem;
    width: 100%;
    max-width: min(80ch, calc(100vw - 4rem));
    min-width: 250px;
  }

  & > main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 50vh;
  }

  & > footer {
    margin-top: auto;

    &:hover a {
      &::before,
      &::after {
        content: "\\2620";
      }
    }
  }
`;

const TEST_CSV = `ottid,name,hymeniumType,capShape,whichGills,stipeCharacter,ecologicalType,howEdible
414777,Panus conchatus,gills,"convex, flat",decurrent,bare,saprotrophic,caution-not-recommended
3826251,Mycena californiensis,gills,"campanulate, conical",adnate,bare,saprotrophic,unknown
186156,Clathrus ruber,gleba,no,not-applicable,volva,saprotrophic,
163798,Leucocoprinus birnbaumii,gills,"ovate, umbonate",free,ring,saprotrophic,poisonous
932607,Bovista plumbea,gleba,no,not-applicable,not-applicable,saprotrophic,"edible, inedible"
520603,Laccaria amethysteo-occidentalis,gills,"convex, depressed","adnate, decurrent",bare,mycorrhizal,edible
3810408,Psathyrella longipes,gills,"campanulate, conical","adnate, seceding",,,unknown
5306400,Leratiomyces percevalii,gills,"campanulate, umbonate",,ring,saprotrophic,unknown
1083422,Aureoboletus flaviporus,pores,convex,adnate,bare,mycorrhizal,edible
3829428,Calvatia booniana,gleba,no,not-applicable,not-applicable,saprotrophic,"choice, inedible"
902757,Bulgaria inquinans,,depressed,not-applicable,not-applicable,saprotrophic,inedible
737455,Agaricus bitorquis,gills,"convex, flat",free,ring,saprotrophic,choice
351351,Marasmius oreades,gills,"convex, umbonate",adnexed,bare,saprotrophic,choice
326480,Pholiota spumosa,gills,"conical, flat","adnate, adnexed",bare,,unknown
949865,Gymnopilus sapineus,gills,convex,adnate,ring,saprotrophic,inedible
963203,Leucopaxillus gentianeus,gills,"convex, flat",adnate,bare,mycorrhizal,inedible
228570,Agrocybe putaminum,gills,convex,adnate,ring,saprotrophic,inedible
1072213,Clitocybe fragrans,gills,flat,decurrent,bare,mycorrhizal,"caution-not-recommended, edible"
267012,Tubaria furfuracea,gills,"convex, flat","adnate, decurrent","bare, ring",saprotrophic,unknown
718301,Tricholoma fracticum,gills,convex,subdecurrent,ring,mycorrhizal,inedible
240840,Hericium erinaceus,teeth,no,not-applicable,not-applicable,saprotrophic,choice
581130,Trametes hirsuta,pores,no,not-applicable,not-applicable,,inedible
985692,Calocera cornea,smooth,no,not-applicable,bare,saprotrophic,inedible
914015,Mycena galericulata,gills,conical,"adnexed, sinuate",bare,saprotrophic,inedible
985686,Ganoderma applanatum,pores,no,decurrent,not-applicable,parasitic,inedible
390393,Clavaria fragilis,smooth,no,not-applicable,bare,saprotrophic,edible
484263,Chlorophyllum molybdites,gills,flat,free,ring,saprotrophic,poisonous
969274,Lactarius rubrilacteus,gills,convex,decurrent,bare,mycorrhizal,edible
59309,Cuphophyllus pratensis,gills,"depressed, umbonate",decurrent,bare,mycorrhizal,"choice, edible"
264479,Hypomyces chrysospermus,smooth,,not-applicable,not-applicable,parasitic,"inedible, poisonous"
518076,Hygrocybe flavescens,gills,conical,adnexed,bare,mycorrhizal,edible
172556,Hygrocybe singeri,gills,conical,adnexed,bare,mycorrhizal,unknown
1065617,Crepidotus mollis,gills,"convex, flat",not-applicable,not-applicable,saprotrophic,"inedible, unknown"
413739,Helvella acetabulum,smooth,infundibuliform,not-applicable,bare,mycorrhizal,caution-not-recommended
199372,Suillus caerulescens,pores,"convex, flat","adnate, decurrent","bare, ring",mycorrhizal,edible
807664,Gomphidius oregonensis,gills,"convex, depressed",decurrent,bare,parasitic,"caution-not-recommended, edible"
670050,Mycena purpureofusca,gills,conical,adnate,bare,saprotrophic,unknown
3815993,Entoloma ferruginans,gills,convex,"emarginate, free",bare,saprotrophic,caution-not-recommended
8349,Bjerkandera adusta,pores,no,not-applicable,not-applicable,saprotrophic,inedible
994531,Phaeolus schweinitzii,pores,offset,decurrent,bare,"parasitic, saprotrophic",inedible
166660,Lactarius alnicola,gills,depressed,"adnate, decurrent",bare,mycorrhizal,inedible
581149,Pleurotus ostreatus,gills,offset,decurrent,bare,"parasitic, saprotrophic",choice
670045,Leratiomyces ceres,gills,"convex, flat",adnate,ring,saprotrophic,"poisonous, unknown"
133080,Exidia glandulosa,smooth,no,not-applicable,not-applicable,saprotrophic,unknown
25198,Lyophyllum decastes,gills,convex,"adnate, decurrent",bare,,"choice, edible"
312374,Stropharia caerulea,gills,"conical, convex","adnate, sinuate",ring,,unknown
647038,Russula xerampelina,gills,"convex, flat",free,bare,mycorrhizal,choice
378888,Floccularia albolanaripes,gills,"convex, umbonate",adnexed,ring,mycorrhizal,edible
301277,Trametes ochracea,pores,offset,decurrent,not-applicable,saprotrophic,too-hard-to-eat
48338,Auriscalpium vulgare,teeth,offset,adnexed,bare,saprotrophic,inedible
430777,Conocybe aurea,gills,"campanulate, conical",adnexed,bare,saprotrophic,unknown
131449,Agaricus hondensis,gills,"convex, flat",free,ring,saprotrophic,poisonous
500350,Xerocomus subtomentosus,pores,convex,seceding,bare,mycorrhizal,edible
396737,Agaricus californicus,gills,convex,free,ring,saprotrophic,poisonous
918135,Xeromphalina campanella,gills,"convex, depressed",decurrent,bare,saprotrophic,"inedible, unknown"
105243,Omphalotus olivascens,gills,infundibuliform,decurrent,bare,saprotrophic,poisonous
368138,Gymnopus dryophilus,gills,convex,"adnexed, free",bare,saprotrophic,"caution-not-recommended, unknown"
476368,Scleroderma cepa,gleba,no,not-applicable,not-applicable,mycorrhizal,poisonous
904065,Pisolithus arhizus,gleba,no,not-applicable,not-applicable,mycorrhizal,inedible
3809980,Psathyrella longistriata,gills,"campanulate, conical",adnexed,ring,saprotrophic,unknown
4095927,Lactarius rufulus,gills,depressed,decurrent,bare,mycorrhizal,edible
954796,Chroogomphus vinicolor,gills,"convex, depressed","adnate, decurrent","bare, ring","mycorrhizal, parasitic",edible
134412,Lysurus mokusin,smooth,,not-applicable,bare,saprotrophic,caution-not-recommended
5678909,Caloboletus marshii,pores,convex,,bare,mycorrhizal,inedible
469858,Coprinellus disseminatus,gills,convex,adnate,bare,saprotrophic,edible
196230,Mycena acicula,gills,"campanulate, conical",adnate,bare,saprotrophic,inedible
223689,Agaricus xanthodermus,gills,convex,free,ring,saprotrophic,poisonous
602199,Peziza vesiculosa,smooth,no,not-applicable,not-applicable,saprotrophic,poisonous
880971,Aleuria aurantia,smooth,no,not-applicable,not-applicable,saprotrophic,edible
1031399,Amanita constricta,gills,"convex, flat",adnexed,volva,mycorrhizal,caution-not-recommended
133073,Tremella mesenterica,smooth,no,not-applicable,not-applicable,parasitic,edible
647039,Hygrophorus eburneus,gills,"convex, flat",decurrent,bare,mycorrhizal,edible
80731,Russula cremoricolor,gills,"convex, depressed","adnate, adnexed",bare,,poisonous
4096448,Lactarius argillaceifolius,gills,depressed,decurrent,bare,mycorrhizal,"poisonous, unknown"
643800,Suillellus amygdalinus,pores,convex,adnate,bare,mycorrhizal,unknown
600646,Hygrophoropsis aurantiaca,gills,"depressed, infundibuliform",decurrent,bare,saprotrophic,"caution-not-recommended, poisonous"
869659,Agaricus augustus,gills,convex,free,ring,saprotrophic,choice
3813443,Gymnopilus aurantiophyllus,gills,convex,"adnate, adnexed",cortina,saprotrophic,inedible
314982,Mycena pura,gills,flat,adnexed,bare,saprotrophic,poisonous
1011406,Morchella rufobrunnea,smooth,"conical, ovate",,bare,saprotrophic,choice
450302,Suillus pungens,pores,convex,,bare,mycorrhizal,edible
776631,Phyllotopsis nidulans,gills,convex,,"bare, not-applicable",saprotrophic,"inedible, unknown"
483859,Laccaria laccata,gills,"convex, flat","adnate, decurrent",bare,mycorrhizal,"caution-not-recommended, edible"
1045730,Lycoperdon umbrinum,gleba,no,not-applicable,not-applicable,saprotrophic,edible
355928,Lepiota magnispora,gills,"flat, ovate",free,"bare, ring",,inedible
205844,Galerina marginata,gills,convex,"adnate, adnexed","bare, ring",saprotrophic,deadly
564685,Boletus regineus,pores,convex,adnate,bare,mycorrhizal,choice
518859,Leucopaxillus albissimus,gills,"convex, flat",decurrent,bare,saprotrophic,inedible
159293,Hericium coralloides,teeth,no,not-applicable,not-applicable,saprotrophic,edible
755361,Mycena haematopus,gills,"campanulate, conical",adnate,bare,saprotrophic,caution-not-recommended
8357,Schizophyllum commune,gills,no,not-applicable,"bare, not-applicable","parasitic, saprotrophic",edible
433926,Hebeloma crustuliniforme,gills,umbonate,adnate,bare,mycorrhizal,poisonous
600624,Hypholoma fasciculare,gills,convex,adnate,ring,saprotrophic,poisonous
307633,Pluteus cervinus,gills,"flat, umbonate",free,bare,saprotrophic,edible
333126,Volvopluteus gloiocephalus,gills,"flat, ovate",free,volva,saprotrophic,"caution-not-recommended, edible"
633296,Phlebia radiata,pores,no,not-applicable,not-applicable,saprotrophic,inedible
137450,Porodaedalea pini,pores,no,not-applicable,"bare, not-applicable",parasitic,inedible
223682,Agaricus bernardii,gills,"convex, flat",free,ring,saprotrophic,choice
880024,Parasola plicatilis,gills,"convex, depressed",free,bare,saprotrophic,inedible
887971,Agrocybe praecox,gills,convex,adnexed,ring,saprotrophic,caution-not-recommended
1095618,Cryptoporus volvatus,pores,no,not-applicable,not-applicable,"parasitic, saprotrophic",inedible
909237,Xerocomellus dryophilus,pores,"convex, flat",,bare,,edible
540446,Abortiporus biennis,pores,"depressed, flat",decurrent,"bare, not-applicable",saprotrophic,unknown
58501,Agrocybe pediades,gills,convex,not-applicable,bare,saprotrophic,"caution-not-recommended, edible"
415045,Hohenbuehelia petaloides,gills,"convex, depressed",decurrent,bare,saprotrophic,edible
591491,Lactarius xanthogalactus,gills,depressed,decurrent,bare,mycorrhizal,unknown
91183,Lepiota castaneidisca,gills,campanulate,free,ring,saprotrophic,unknown
964607,Xeromphalina cauticinalis,gills,"convex, flat","adnate, decurrent",bare,saprotrophic,"inedible, unknown"
1047949,Armillaria mellea,gills,"convex, flat","adnate, subdecurrent",ring,parasitic,"allergenic, edible"
61663,Panaeolus papilionaceus,gills,convex,adnexed,bare,saprotrophic,inedible
807671,Stropharia ambigua,gills,convex,adnate,ring,saprotrophic,unknown
103184,Conocybe apala,gills,conical,"adnexed, free",bare,saprotrophic,unknown
469854,Coprinellus flocculosus,gills,"campanulate, ovate","adnexed, free","bare, volva",saprotrophic,unknown
394858,Cantharellus californicus,ridges,infundibuliform,decurrent,bare,mycorrhizal,choice
994523,Fuscoporia gilva,pores,no,not-applicable,not-applicable,"parasitic, saprotrophic",unknown
1002805,Astraeus hygrometricus,gleba,no,not-applicable,not-applicable,mycorrhizal,inedible
898969,Hypholoma capnoides,gills,convex,adnate,ring,saprotrophic,caution-not-recommended
943200,Stereum hirsutum,smooth,"no, offset",decurrent,not-applicable,"parasitic, saprotrophic",inedible
44255,Xylaria hypoxylon,smooth,no,not-applicable,not-applicable,,inedible
1046466,Coprinellus micaceus,gills,"campanulate, conical",adnexed,bare,saprotrophic,edible
789172,Coprinus comatus,gills,conical,free,ring,saprotrophic,choice
581141,Trametes versicolor,pores,"no, offset",decurrent,not-applicable,saprotrophic,too-hard-to-eat
81912,Coprinopsis lagopus,gills,ovate,free,bare,saprotrophic,unknown
492858,Conocybe tenera,gills,"conical, convex",adnate,bare,saprotrophic,inedible
3813426,Gymnopilus ventricosus,gills,convex,"adnate, adnexed",,saprotrophic,inedible
792705,Hebeloma velutipes,gills,"convex, umbonate","adnate, sinuate",bare,mycorrhizal,poisonous
5684295,Fomitopsis mounceae,pores,no,not-applicable,not-applicable,"parasitic, saprotrophic",inedible
496900,Melanoleuca melaleuca,gills,"convex, umbonate",emarginate,bare,saprotrophic,unknown
964609,Strobilurus trullisatus,gills,convex,adnexed,bare,saprotrophic,unknown
5345622,Paxillus cuprinus,gills,"convex, flat","adnate, decurrent",bare,mycorrhizal,poisonous
489303,Inocybe geophylla,gills,"conical, umbonate",adnexed,bare,mycorrhizal,poisonous
363316,Coprinopsis atramentaria,gills,ovate,free,bare,saprotrophic,"edible, poisonous"
774670,Russula brevipes,gills,"flat, infundibuliform",decurrent,bare,mycorrhizal,edible
128546,Lacrymaria lacrymabunda,gills,campanulate,adnate,bare,saprotrophic,caution-not-recommended
351551,Gliophorus psittacinus,gills,convex,adnate,bare,mycorrhizal,edible
17230,Pleurotus pulmonarius,gills,"convex, offset",decurrent,bare,saprotrophic,choice
186669,Lactarius pubescens,gills,depressed,decurrent,bare,mycorrhizal,unknown
103193,Bolbitius titubans,gills,"flat, ovate","adnate, free",bare,saprotrophic,unpalatable`;
const TEST_NEWICK = prepareFromString(
  '((((((((((((((((((((((((351351)))),((((((((368138))))))),((105243)))),((((1047949),((((964609))))),(((((755361)),196230,670050,914015,3826251,314982))))))),(((3815993)),((((25198)))))),((((((520603,483859)),((61663))),(103193),(103184,430777,492858)),(((((((((205844,312374,600624,807671,898969),326480),(58501,228570,887971))))),(((((267012)))),((((1065617)))),489303)),((949865,3813426,3813443)),(670045,5306400)),(((469854,469858,1046466),(((81912,363316),(((128546)),3809980,3810408)),(880024))),(((((((((((((91183,355928))))))),((((((484263)))),((((869659)),396737),737455))))),((1045730),(3829428))),(789172)),163798))))),(((((1031399)),((17230,581149),(415045))),(((496900)),((307633),(333126)))))),(((((918135,964607),((647039),(59309))),((((390393))),(((776631))))),(((718301),((((((((518859)))),((963203)))))))))),(172556,518076),(351551)),((((8357)))))),((((((((159293,(((240840))))))),(((((943200))))))),((((((48338)))))),166660,186669,591491,969274,4095927,4096448)))),((((((((((581141,301277,581130))),((((((985686)))))))),((((633296),(8349),(540446)))))))),((((((((476368),((1002805))),((904065)))),((((5345622))))),((((((((199372)))),450302))),((807664),(954796)))),((600646)),1083422)),(((((5684295),(994531))),500350))))),564685),((((((((394858)))))))),((((((223689))))))),((((((((((186156)))),((134412))))))),((((133080))))),((((433926)))),80731,(414777),(((643800))),(((647038))),(932607),131449,137450,223682,(378888),774670,792705,(909237),994523,1072213,(1095618),5678909),((((((((985692))))))))),((((((((133073)))))))))))),(((((((((((((((((((((44255)))))))))))),(((((902757))))))))),((((413739)),((602199)),((880971)),((1011406))))),264479)))));'
);

const SOURCE_URL =
  // eslint-disable-next-line max-len
  'https://github.com/tif-calin/bazaar-fair-emporium-playground-whatever/tree/main/app/pages/cladetable';

const CladeTablePage = () => {
  return (
    <Page>
      <header>
        <h1>CladeTable</h1>
      </header>
      <main>
        <ToolBar />
        {/* <PhylogeneticCladeTable /> */}
        <FromNewickAndCsv csv={TEST_CSV} newick={TEST_NEWICK} />
      </main>
      <footer>
        <a href={SOURCE_URL}> steal this </a>
      </footer>
    </Page>
  );
};

export default React.memo(CladeTablePage);
