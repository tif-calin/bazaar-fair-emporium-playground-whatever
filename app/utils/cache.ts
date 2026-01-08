const IN_MEMORY_CACHE: Record<string, unknown> = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withInMemoryCache = <T extends (...args: any[]) => unknown>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T> => {
  const cacheKey = `${fn.name}-${JSON.stringify(args)}`;

  IN_MEMORY_CACHE[cacheKey] ||= fn(...args);
  return IN_MEMORY_CACHE[cacheKey] as ReturnType<T>;
};
