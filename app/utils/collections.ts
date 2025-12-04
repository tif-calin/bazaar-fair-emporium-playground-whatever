/**
 * Given an array, returns an array of arrays, each with a maximum length of `size`.
 *
 * @example ```
 * chunk([1, 2, 3, 4, 5], 3);
 * // [[1, 2, 3], [4, 5]]
 * ```
 */
export const chunk = <T>(arr: T[], size: number) => {
  if (!Number.isSafeInteger(size)) throw new Error('size must be a safe integer');

  return arr.reduce<T[][]>((acc, curr, index) => {
    const chunkIndex = Math.floor(index / size);
    acc[chunkIndex] ||= [];
    acc[chunkIndex].push(curr);

    return acc;
  }, []);
};

export const keyByFunction = <NewKey extends string, Obj>(
  items: Obj[],
  keyGetter: (obj: Obj, i: number) => NewKey
) =>
  items.reduce(
    (acc, item, index) => {
      const keyName = keyGetter(item, index);

      acc[keyName] = item;
      return acc;
    },
    {} as Record<NewKey, Obj>
  );

/**
 * Returns hash with property values for keys, grouped items as values
 */
export const groupByFunction = <NewKey extends string, ObjType>(
  items: ObjType[],
  keyGetter: (obj: ObjType, i: number) => NewKey
): Record<NewKey, ObjType[]> =>
  items.reduce<Record<string, ObjType[]>>((acc, item, i) => {
    const typename = keyGetter(item, i);

    acc[typename] ||= [];
    acc[typename].push(item);
    return acc;
  }, {});

/**
 * Takes a list of objects and groups them by a given key.
 */
export const groupByKey = <Obj extends { [key in Key]: PropertyKey }, Key extends keyof Obj>(
  items: Obj[],
  key: Key
) =>
  items.reduce(
    (acc, item) => {
      const typename = item[key];
      acc[typename] ||= [];
      acc[typename].push(item);
      return acc;
    },
    {} as Record<Obj[Key], Obj[]>
  );

/**
 * @example
 * ```ts
 * const example = [{ foo: 'bar' }, null, undefined, { foo: 'qux' }].filter(notEmpty);
 * #      ^? Array<{ foo: string }>
 * ```
 */
export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
  value !== null && value !== undefined;
