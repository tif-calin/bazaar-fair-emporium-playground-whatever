import test, { describe } from "node:test";
import { chunk } from "./collections.ts";
import assert from "node:assert";

type TestCase<Func extends (...args: any) => unknown> = {
  description: string;
  input: Parameters<Func>;
} & ({ shouldThrow: true } | { expected: ReturnType<Func> });

describe("chunk", () => {
  const TEST_CASES: TestCase<typeof chunk>[] = [
    {
      description: "empty array",
      input: [[], 36],
      expected: [],
    },
    {
      description: "4 numbers by 3",
      input: [[1_011_450, 1_027_077, 1_045_980, 1_060_147], 3],
      expected: [[1_011_450, 1_027_077, 1_045_980], [1_060_147]],
    },
    // {
    //   description: "throw error if chunk size isnt integer",
    //   input: [["rose", "violet", "indigo", "lilac", "lavender"], 4.5],
    //   shouldThrow: true,
    // },
  ] as const;

  TEST_CASES.forEach((testCase) => {
    test(testCase.description, () => {
      const original = testCase.input[0].slice();
      const actual = chunk(...testCase.input);

      if ("shouldThrow" in testCase) {
        assert.throws(() => chunk(...testCase.input));
      } else {
        // test correct output
        assert.deepEqual(actual, testCase.expected);

        // test that original array is not modified
        assert.deepEqual(original, testCase.input[0]);
      }
    });
  });
});
