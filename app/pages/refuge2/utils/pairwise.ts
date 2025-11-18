export const pairwise = <T, Key extends string | number>(
  ids: Key[],
  comparator: (a: Key, b: Key) => T
) => {
  const result: Record<string, Record<string, T>> = {};

  ids.forEach((currId, index, arr) => {
    let currKey = `${currId}`;
    result[currKey] ||= {};

    arr.slice(index + 1).forEach((nextId) => {
      const nextKey = `${nextId}`;
      result[nextKey] ||= {};
      const value = comparator(currId, nextId);
      result[currKey][nextKey] = value;
      result[nextKey][currKey] = value;

      if (typeof value === "number" && value < 10) console.warn(currId, nextId);
    });
  });

  return result;
};
