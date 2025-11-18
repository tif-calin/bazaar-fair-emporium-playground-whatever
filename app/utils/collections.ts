export const chunk = <T>(arr: T[], size: number) => {
  if (!Number.isSafeInteger(size)) throw new Error("size must be a safe integer");

  return arr.reduce<T[][]>((acc, curr, index) => {
    const chunkIndex = Math.floor(index / size);
    acc[chunkIndex] ||= [];
    acc[chunkIndex].push(curr);

    return acc;
  }, []);
};
