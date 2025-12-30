/**
 * Lets you map through a record.
 */
export const mapObject = <U, T extends Record<string, T[keyof T]> = Record<string, U>>(
  object: T,
  fn: (key: keyof T, value: T[keyof T], i: number, array: [keyof T, T[keyof T]][]) => [string, U]
): Record<ReturnType<typeof fn>[0], ReturnType<typeof fn>[1]> =>
  Object.fromEntries(Object.entries(object).map(([k, v], ...rest) => fn(k, v, ...rest)));

/**
 * Filters key/values of an object.
 */
export const filterObject = <T extends Record<string, T[keyof T]>>(
  object: T,
  fn: (key: keyof T, value: T[keyof T], i: number, array: [keyof T, T[keyof T]][]) => boolean
): Record<keyof T, T[keyof T]> =>
  Object.fromEntries(Object.entries(object).filter(([k, v], i, arr) => fn(k, v, i, arr))) as Record<
    keyof T,
    T[keyof T]
  >;

/**
 * A type-preserving version of Object.fromEntries().
 */
export const objectFromEntries = <T extends ReadonlyArray<readonly [PropertyKey, U]>, U = unknown>(
  entries: T
) => Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };

/**
 * A type-preserving version of Object.entries().
 */
export const objectEntries = <T extends object>(object: T) =>
  Object.entries(object) as [keyof T, T[keyof T]][];

/**
 * Turns key-value pairs into value-key pairs.
 */
export const reverseObject = <TKey extends string, TValue extends string>(
  obj: Record<TKey, TValue>
) => mapObject(obj, (k, v) => [v, k] as const) as { [V in TValue]: TKey };
