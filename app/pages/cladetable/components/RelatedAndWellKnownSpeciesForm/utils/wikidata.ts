import { notEmpty } from "~/utils/collections";
import { httpRequest } from "~/utils/http";
import { objectFromEntries } from "~/utils/object";

const BASE_URL = "https://www.wikidata.org/w/api.php";

/**
 * ## external identifiers
 * ### General
 * - P830 (Encyclopedia of Life)
 * - P846 (GBIF)
 * - P3031 (EPPO)
 * - P3151 (iNaturalist)
 * - P9157 (Open Tree of Life)
 *
 * ### Plants
 * - P4753 (EcoCrop)
 * - P10366 (Gardens Navigator)
 * Also: PFAF, PalDat
 *
 * ### Birds
 * - P2026 (Avibase)
 * - P2426 (xeno-canto)
 * Also: eBird, BirdLife, All About Birds
 *
 * ## other
 * - P1843 (common name)
 */
const PROPERTIES = [
  {
    propertyId: "P2026",
    url: "https://avibase.bsc-eoc.org/species.jsp?avibaseid={{ID}}",
    title: "Avibase",
    desc: "database",
  },
  {
    propertyId: "P10585",
    url: "https://www.catalogueoflife.org/data/taxon/{{ID}}",
    title: "Catalogue of Life",
    desc: "taxonomy",
  },
  {
    propertyId: "P4753",
    url: "https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id={{ID}}",
    title: "EcoCrop",
    desc: "crop suitability",
  },
  {
    propertyId: "P830",
    url: "https://eol.org/pages/{{ID}}",
    title: "Encyclopedia of Life",
    desc: "traits",
  },
  {
    propertyId: "P3031",
    url: "https://gd.eppo.int/taxon/{{ID}}",
    title: "EPPO Global Database",
    desc: "pests",
  },
  {
    propertyId: "P10366",
    url: "http://navigate.botanicgardens.org/weboi/oecgi2.exe/INET_ECM_DispPl?NAMENUM={{ID}}",
    title: "Gardens Navigator",
    desc: "botanical gardens",
  },
  {
    propertyId: "P846",
    url: "https://www.gbif.org/species/{{ID}}",
    title: "GBIF",
    desc: "distribution",
  },
  {
    propertyId: "P3151",
    url: "https://www.inaturalist.org/taxa/{{ID}}",
    title: "iNaturalist",
    desc: "observations",
  },
  {
    propertyId: "P9157",
    url: "https://tree.opentreeoflife.org/opentree/argus/ottol@{{ID}}",
    title: "Open Tree of Life",
    desc: "phylogeny",
  },
  {
    propertyId: "P2426",
    url: "https://www.xeno-canto.org/species/{{ID}}",
    title: "xeno-canto",
    desc: "vocalizations",
  },
  // non-properties
  {
    propertyId: "WIKIDATA",
    url: "https://www.wikidata.org/wiki/{{ID}}",
    title: "Wikidata",
    desc: "knowledge base",
  },
  // {
  //   propertyId: "PALDAT",
  //   url: "https://www.paldat.org/pub/{{SPECIES::SNAKE}}/{{ID}}",
  //   title: "PalDat",
  //   desc: "palynology",
  // },
  // TODO: Biodiversity Heritage Library https://www.biodiversitylibrary.org/name/Cinnyris_osea
  // TODO: OneZoom https://www.onezoom.org/life/@={{ID}}
] as const;

type WBSearchEntitiesResult = {
  searchInfo: { search: string };
  search: Array<{
    id: string;
    concepturi: string;
    label: string;
    match: { type: string; language: string; text: string };
    pageId: number;
    title: string;
  }>;
  success: 1 | 0;
};

type WBGetClaimsResult = {
  claims: Record<
    string,
    Array<{
      mainsnak: {
        snaktype: "value";
        property: string;
        datavalue:
          | { type: "string"; value: string }
          | { type: "wikibase-entityid"; value: { id: string; "entity-type": string } }
          | { type: "monolingualtext"; value: { language: string; text: string } };
      };
    }>
  >;
};

/**
 * Given a species name, returns the Wikidata ID for that species. Then, use that ID to fetch
 * additional WikiData "claims" including external identifiers and common names.
 */
export const getWikiData = async (latinName: string) => {
  // 1. Get WikiData ID
  const urlWbSearchEntities = `${BASE_URL}?action=wbsearchentities&search=${encodeURIComponent(
    latinName
  )}&origin=*&language=en&format=json&type=item`;
  const searchResult = await httpRequest<WBSearchEntitiesResult>({
    url: urlWbSearchEntities,
    opts: { readAs: "json" },
  });
  const wikidataId = searchResult?.search.at(0)?.id;

  if (!wikidataId) throw new Error(`Wikidata: No ID found for ${latinName}`);

  // 2. Get WikiData claims
  // TODO: don't fetch ALL claims
  const urlWbGetClaims = `${BASE_URL}?action=wbgetclaims&entity=${wikidataId}&format=json&origin=*`;
  const claimsResult = await httpRequest<WBGetClaimsResult>({
    url: urlWbGetClaims,
    opts: { readAs: "json" },
  });

  const identifiers = PROPERTIES.map((page) => {
    const { propertyId } = page;

    const datavalue = claimsResult?.claims[propertyId]?.at(0)?.mainsnak.datavalue;
    if (!datavalue) return null;
    if (datavalue?.type !== "string") {
      throw new Error(`Wikidata: Unexpected datavalue type: ${datavalue?.type}`);
    }

    let id = "";
    switch (propertyId) {
      case "P2026": // Avibase
        id = datavalue.value.slice(0, 8) || "";
        break;
      case "WIKIDATA":
        id = wikidataId;
        break;
      default:
        id = datavalue.value || "";
    }

    if (!id) return null;

    const url = page.url.replace("{{ID}}", id);
    return { ...page, url, id };
  }).filter(notEmpty);

  return {
    names: {
      ...objectFromEntries(
        // @ts-expect-error wikidata result is untyped. TODO: use Zod
        (claimsResult.claims["P1843"] || []).map((claim) => {
          const { value, type } = claim.mainsnak.datavalue;
          if (type !== "monolingualtext") {
            throw new Error(`Wikidata: Unexpected datavalue type: ${type}`);
          }

          return [value.language, value.text];
        }) as [string, string][]
      ),
    },
    identifiers,
  };
};
