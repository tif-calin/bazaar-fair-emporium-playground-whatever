export const countLeaves = <T extends { children?: T[] }>(tree: T, counted = 0): number => {
  if (tree.children?.length) {
    return tree.children.reduce((acc, child) => countLeaves(child, acc), counted);
  } else return counted + 1;
};

export const findDepth = <T extends { children?: T[] }>(tree: T, depth = 1): number => {
  if (tree.children?.length) {
    return Math.max(...tree.children.map((child) => findDepth(child, depth + 1)));
  } else return depth;
};
