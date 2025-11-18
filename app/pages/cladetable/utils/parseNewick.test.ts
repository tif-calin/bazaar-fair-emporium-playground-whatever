import test, { describe } from "node:test";
import parseNewick from "./parseNewick.js";
import assert from "node:assert";

type TestCase = {
  description: string;
  input: Parameters<typeof parseNewick>[0];
  expected: ReturnType<typeof parseNewick>;
};

/**
 * ```
 *   F
 *  /|\
 * A B E
 *    / \
 *   C   D
 * ```
 */
const WIKI7: TestCase = {
  description: "distances and all names (wikipedia example #7)",
  input: "(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;",
  expected: {
    name: "F",
    children: [
      { name: "A", length: 0.1 },
      { name: "B", length: 0.2 },
      {
        name: "E",
        length: 0.5,
        children: [
          { name: "C", length: 0.3 },
          { name: "D", length: 0.4 },
        ],
      },
    ],
  },
};

/**
 * ```
 *     *
 *    / \
 *   *   *
 *  /|  /|
 * c p g *
 *       |\
 *       l *
 *         |\
 *         c p
 * ```
 */
const TOMATOES = {
  description: "tomato relatives example",
  input:
    "((Solanum chmielewskii,Solanum pennellii),(Solanum galapagense,(Solanum lycopersicum,(Solanum cheesmaniae,Solanum pimpinellifolium))));",
  expected: {
    children: [
      {
        children: [{ name: "Solanum chmielewskii" }, { name: "Solanum pennellii" }],
      },
      {
        children: [
          { name: "Solanum galapagense" },
          {
            children: [
              { name: "Solanum lycopersicum" },
              {
                children: [{ name: "Solanum cheesmaniae" }, { name: "Solanum pimpinellifolium" }],
              },
            ],
          },
        ],
      },
    ],
  },
};

const TEST_CASES = [
  WIKI7,
  {
    description: "no nodes are named (wikipedia example #1)",
    input: "(,,(,));",
    expected: {
      children: [
        {},
        {},
        {
          children: [{}, {}],
        },
      ],
    },
  },
  {
    description: "only leaf nodes are named (wikipedia example #2)",
    input: "(A,B,(C,D));",
    expected: {
      children: [
        { name: "A" },
        { name: "B" },
        {
          children: [{ name: "C" }, { name: "D" }],
        },
      ],
    },
  },
  {
    description: "no names, just distances (wikipedia example #4)",
    input: "(:0.1,:0.2,(:0.3,:0.4):0.5);",
    expected: {
      children: [
        { length: 0.1 },
        { length: 0.2 },
        {
          length: 0.5,
          children: [{ length: 0.3 }, { length: 0.4 }],
        },
      ],
    },
  },
  TOMATOES,
];

describe("parseNewick", () => {
  TEST_CASES.forEach((testCase) => {
    test(testCase.description, () => {
      const actual = parseNewick(testCase.input);

      // test correct output
      assert.deepEqual(actual, testCase.expected);
    });
  });
});
