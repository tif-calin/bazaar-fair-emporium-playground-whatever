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
58501,Agrocybe pediades,gills,convex,not-applicable,bare,saprotrophic,"caution-not-recommended, edible"
326480,Pholiota spumosa,gills,"conical, flat","adnate, adnexed",bare,,unknown
4095927,Lactarius rufulus,gills,depressed,decurrent,bare,mycorrhizal,edible
134412,Lysurus mokusin,smooth,,not-applicable,bare,saprotrophic,caution-not-recommended
880971,Aleuria aurantia,smooth,no,not-applicable,not-applicable,saprotrophic,edible
3815993,Entoloma ferruginans,gills,convex,"emarginate, free",bare,saprotrophic,caution-not-recommended
228570,Agrocybe putaminum,gills,convex,adnate,ring,saprotrophic,inedible
643800,Suillellus amygdalinus,pores,convex,adnate,bare,mycorrhizal,unknown
647039,Hygrophorus eburneus,gills,"convex, flat",decurrent,bare,mycorrhizal,edible
943200,Stereum hirsutum,smooth,"no, offset",decurrent,not-applicable,"parasitic, saprotrophic",inedible
196230,Mycena acicula,gills,"campanulate, conical",adnate,bare,saprotrophic,inedible
264479,Hypomyces chrysospermus,smooth,,not-applicable,not-applicable,parasitic,"inedible, poisonous"
963203,Leucopaxillus gentianeus,gills,"convex, flat",adnate,bare,mycorrhizal,inedible
1072213,Clitocybe fragrans,gills,flat,decurrent,bare,mycorrhizal,"caution-not-recommended, edible"
670045,Leratiomyces ceres,gills,"convex, flat",adnate,ring,saprotrophic,"poisonous, unknown"
3813443,Gymnopilus aurantiophyllus,gills,convex,"adnate, adnexed",cortina,saprotrophic,inedible
368138,Gymnopus dryophilus,gills,convex,"adnexed, free",bare,saprotrophic,"caution-not-recommended, unknown"
949865,Gymnopilus sapineus,gills,convex,adnate,ring,saprotrophic,inedible
240840,Hericium erinaceus,teeth,no,not-applicable,not-applicable,saprotrophic,choice
755361,Mycena haematopus,gills,"campanulate, conical",adnate,bare,saprotrophic,caution-not-recommended
1065617,Crepidotus mollis,gills,"convex, flat",not-applicable,not-applicable,saprotrophic,"inedible, unknown"
1002805,Astraeus hygrometricus,gleba,no,not-applicable,not-applicable,mycorrhizal,inedible
199372,Suillus caerulescens,pores,"convex, flat","adnate, decurrent","bare, ring",mycorrhizal,edible
396737,Agaricus californicus,gills,convex,free,ring,saprotrophic,poisonous
807671,Stropharia ambigua,gills,convex,adnate,ring,saprotrophic,unknown
172556,Hygrocybe singeri,gills,conical,adnexed,bare,mycorrhizal,unknown
880024,Parasola plicatilis,gills,"convex, depressed",free,bare,saprotrophic,inedible
789172,Coprinus comatus,gills,conical,free,ring,saprotrophic,choice
103184,Conocybe apala,gills,conical,"adnexed, free",bare,saprotrophic,unknown
450302,Suillus pungens,pores,convex,,bare,mycorrhizal,edible
904065,Pisolithus arhizus,gleba,no,not-applicable,not-applicable,mycorrhizal,inedible
80731,Russula cremoricolor,gills,"convex, depressed","adnate, adnexed",bare,,poisonous
469854,Coprinellus flocculosus,gills,"campanulate, ovate","adnexed, free","bare, volva",saprotrophic,unknown
581149,Pleurotus ostreatus,gills,offset,decurrent,bare,"parasitic, saprotrophic",choice
363316,Coprinopsis atramentaria,gills,ovate,free,bare,saprotrophic,"edible, poisonous"
267012,Tubaria furfuracea,gills,"convex, flat","adnate, decurrent","bare, ring",saprotrophic,unknown
166660,Lactarius alnicola,gills,depressed,"adnate, decurrent",bare,mycorrhizal,inedible
600624,Hypholoma fasciculare,gills,convex,adnate,ring,saprotrophic,poisonous
887971,Agrocybe praecox,gills,convex,adnexed,ring,saprotrophic,caution-not-recommended
3826251,Mycena californiensis,gills,"campanulate, conical",adnate,bare,saprotrophic,unknown
520603,Laccaria amethysteo-occidentalis,gills,"convex, depressed","adnate, decurrent",bare,mycorrhizal,edible
133073,Tremella mesenterica,smooth,no,not-applicable,not-applicable,parasitic,edible
500350,Xerocomus subtomentosus,pores,convex,seceding,bare,mycorrhizal,edible
223689,Agaricus xanthodermus,gills,convex,free,ring,saprotrophic,poisonous
8357,Schizophyllum commune,gills,no,not-applicable,"bare, not-applicable","parasitic, saprotrophic",edible
307633,Pluteus cervinus,gills,"flat, umbonate",free,bare,saprotrophic,edible
81912,Coprinopsis lagopus,gills,ovate,free,bare,saprotrophic,unknown
4096448,Lactarius argillaceifolius,gills,depressed,decurrent,bare,mycorrhizal,"poisonous, unknown"
105243,Omphalotus olivascens,gills,infundibuliform,decurrent,bare,saprotrophic,poisonous
918135,Xeromphalina campanella,gills,"convex, depressed",decurrent,bare,saprotrophic,"inedible, unknown"
163798,Leucocoprinus birnbaumii,gills,"ovate, umbonate",free,ring,saprotrophic,poisonous
994523,Fuscoporia gilva,pores,no,not-applicable,not-applicable,"parasitic, saprotrophic",unknown
159293,Hericium coralloides,teeth,no,not-applicable,not-applicable,saprotrophic,edible
137450,Porodaedalea pini,pores,no,not-applicable,"bare, not-applicable",parasitic,inedible
909237,Xerocomellus dryophilus,pores,"convex, flat",,bare,,edible
1095618,Cryptoporus volvatus,pores,no,not-applicable,not-applicable,"parasitic, saprotrophic",inedible
994531,Phaeolus schweinitzii,pores,offset,decurrent,bare,"parasitic, saprotrophic",inedible
718301,Tricholoma fracticum,gills,convex,subdecurrent,ring,mycorrhizal,inedible
5306400,Leratiomyces percevalii,gills,"campanulate, umbonate",,ring,saprotrophic,unknown
433926,Hebeloma crustuliniforme,gills,umbonate,adnate,bare,mycorrhizal,poisonous
205844,Galerina marginata,gills,convex,"adnate, adnexed","bare, ring",saprotrophic,deadly
133080,Exidia glandulosa,smooth,no,not-applicable,not-applicable,saprotrophic,unknown
1011406,Morchella rufobrunnea,smooth,"conical, ovate",,bare,saprotrophic,choice
333126,Volvopluteus gloiocephalus,gills,"flat, ovate",free,volva,saprotrophic,"caution-not-recommended, edible"
591491,Lactarius xanthogalactus,gills,depressed,decurrent,bare,mycorrhizal,unknown
985692,Calocera cornea,smooth,no,not-applicable,bare,saprotrophic,inedible
1046466,Coprinellus micaceus,gills,"campanulate, conical",adnexed,bare,saprotrophic,edible
3810408,Psathyrella longipes,gills,"campanulate, conical","adnate, seceding",,,unknown
776631,Phyllotopsis nidulans,gills,convex,,"bare, not-applicable",saprotrophic,"inedible, unknown"
581141,Trametes versicolor,pores,"no, offset",decurrent,not-applicable,saprotrophic,too-hard-to-eat
484263,Chlorophyllum molybdites,gills,flat,free,ring,saprotrophic,poisonous
314982,Mycena pura,gills,flat,adnexed,bare,saprotrophic,poisonous
540446,Abortiporus biennis,pores,"depressed, flat",decurrent,"bare, not-applicable",saprotrophic,unknown
103193,Bolbitius titubans,gills,"flat, ovate","adnate, free",bare,saprotrophic,unpalatable
1047949,Armillaria mellea,gills,"convex, flat","adnate, subdecurrent",ring,parasitic,"allergenic, edible"
44255,Xylaria hypoxylon,smooth,no,not-applicable,not-applicable,,inedible
394858,Cantharellus californicus,ridges,infundibuliform,decurrent,bare,mycorrhizal,choice
186156,Clathrus ruber,gleba,no,not-applicable,volva,saprotrophic,
390393,Clavaria fragilis,smooth,no,not-applicable,bare,saprotrophic,edible`;
const TEST_NEWICK = prepareFromString(
  '((((((((((((((((((((((((((((368138))))))),((105243)1065745))),((((1047949)376122)1082072,(((((755361)),196230,3826251,314982))))))),(((3815993)))),((((((520603)985684)850291),(103193)484258,(103184)887970),(((((((((205844,600624,807671)221808,326480),(58501,228570,887971)234954)))),(((((267012)489162)5344589)),((((1065617)493754))))),((949865,3813443)949866),(670045,5306400)12480),(((469854,1046466)318011,(((81912,363316)318012,(3810408)),(880024)842378)),((((((((((((484263))))1010493,((396737))))))),(789172)737440),163798))))),(((((581149)581152)13836),(((307633)684077,(333126)925984)639988)))),(((((918135)964606,((647039)135578)),((((390393)1050391)729017),(((776631)487011)))),(((718301)831065,((((((963203)))))))))),(172556)282216),((((8357)8353)8354)))),((((((((159293,(((240840))))1044744))),(((((943200)715752)))))),166660,591491,4095927,4096448)))),((((((((((581141)205112)))),((((540446)540445)42234)))))),(((((((((1002805)466188)4106481),((904065)1075176)))),((((((((199372)))),450302)111533)457232))))),(((((994531)994530)4099718),500350)))))),((((((((394858)558122)183998)))))558119),((((((223689))))))),((((((((((186156)186157))),((134412)512449)))))),((((133080)133079)434121)741000)),((((433926)))),80731,(((643800))),137450,(909237),994523,1072213,(1095618)1095616)1012685,((((((((985692)))))))17233)5287468),((((((((133073)391921)))))183800))1012689)633300)))634628,(((((((((((((((((((((44255)44251)44252)565288))))))))))))),((((880971)622666)620530,((1011406)306159)306161)880969)),264479)971709)1098854))439373)656316;'
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
