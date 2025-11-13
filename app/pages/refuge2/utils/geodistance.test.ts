import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { haversine, pythagorean } from "./geodistance.ts";

const FIXTURES = {
  belingkas: [-0.0983, 103.55632],
  london: [51.507222, -0.1275],
  mandah: [0.021111, 103.498056],
  minnesota1: [45.2060852, -93.55988902], // home
  minnesota2: [45.2067957, -93.56001777], // the park
  minnesota3: [45.2059227, -93.56022161], // next door
  nyc: [40.712778, -74.006111],
  philly: [39.952778, -75.163611],
} as const;

type TestCase = { description: string; input: [number, number, number, number]; expected: number };

/**
 * "Actual" distances are calculated using python geographiclib.
 *
 * ```py
 * from geographiclib.geodesic import Geodesic; geod = Geodesic.WGS84
 *
 * g = geod.Inverse(12.345, 6.789, -9.876, 123.456); g['s12']
 * ```
 */
const TESTS: Array<TestCase> = [
  {
    description: "London to NYC",
    input: [...FIXTURES.london, ...FIXTURES.nyc],
    expected: 5_585_268.430851161,
  },
  {
    description: "NYC to Philly",
    input: [...FIXTURES.nyc, ...FIXTURES.philly],
    expected: 129_600.726476596,
  },
  {
    description: "from home to the park",
    input: [...FIXTURES.minnesota1, ...FIXTURES.minnesota2],
    expected: 79.6072230911452,
  },
  {
    description: "from home to next door",
    input: [...FIXTURES.minnesota1, ...FIXTURES.minnesota3],
    expected: 31.763190931203727,
  },
  {
    description: "crossing the equator in Indonesia",
    input: [...FIXTURES.mandah, ...FIXTURES.belingkas],
    expected: 14_710.77992393733,
  },
];

describe("geodistance functions", () => {
  TESTS.forEach(({ description, input, expected }) => {
    describe(description, () => {
      test("haversine is within 1% of expected value", () => {
        const actual = haversine(...input);

        assert.ok(Math.min(actual / expected, expected / actual) < 1.01);
      });

      test("works both directions", () => {
        assert.equal(haversine(...input), haversine(input[2], input[3], input[0], input[1]));
      });
    });
  });
});
