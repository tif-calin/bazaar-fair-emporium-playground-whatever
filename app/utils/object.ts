/**
 * Lets you map through a record.
 */
export const mapObject = <U, T extends Record<string, T[keyof T]> = Record<string, U>>(
  object: T,
  fn: (key: keyof T, value: T[keyof T], i: number, array: [keyof T, T[keyof T]][]) => [string, U]
): Record<ReturnType<typeof fn>[0], ReturnType<typeof fn>[1]> =>
  Object.fromEntries(Object.entries(object).map(([k, v], ...rest) => fn(k, v, ...rest)));
