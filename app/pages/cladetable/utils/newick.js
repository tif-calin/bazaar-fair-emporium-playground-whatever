const RE_LENGTH = /:(?<len>[\d.]+)$(?!.*:)/;
const RE_NEWICK_TOKENS = /\s*(;|,|\(|\))\s*/;
const RE_FINAL_SEMICOLON = /;$/;

/**
 * @template {Record<string, any>} [T=Record<string, any>]
 *
 * @typedef {{
 *   children?: NewickNode<T>[];
 *   name?: string;
 *   length?: number;
 *   data?: T;
 * }} NewickNode
 */

/**
 * @param {string} newick
 * @returns {NewickNode}
 */
export const parseNewick = (newick) => {
  /** @type {NewickNode} */
  let tree = {};
  /** @type {NewickNode[]} */
  const ancestors = [];

  const tokens = newick
    .trim()
    .replace(RE_FINAL_SEMICOLON, "")
    .split(RE_NEWICK_TOKENS)
  ;

  tokens.forEach((token, index) => {
    const trimmed = token.trim();
    if (!trimmed) return;

    switch (trimmed) {
      case "(": // begin children
        ancestors.push(tree);
        tree = {};
        ancestors[ancestors.length - 1].children ||= [tree];
        break;
      case ",": // sibling
        tree = {};
        if (!ancestors[ancestors.length - 1].children) {
          const errorContext = tokens.slice(index - 1, index + 2).join("");
          throw new Error(`Unexpected ',' in ${errorContext}`);
        } else ancestors[ancestors.length - 1].children?.push(tree);
        break;
      case ")": // end children
        tree = /** @type {NewickNode} */(ancestors.pop());
        if (!tree) {
          const errorContext = tokens.slice(index - 1, index + 2).join("");
          throw new Error(`Unexpected ')' at "${errorContext}"`);
        }
        break;
      default: // node
        const match = RE_LENGTH.exec(trimmed);
        if (match && match.at(0) && match.groups?.len) tree.length = parseFloat(match.groups?.len);
        const name = trimmed.replace(RE_LENGTH, "");
        if (name) tree.name = name;
    }
  });

  return tree;
};

/** @param {NewickNode} node */
export const unparseNewick = (node, isRoot = -1) => {
  let newick = '';

  if (node.children?.length) newick += `(${node.children.map(unparseNewick).join(',')})`;
  if (node.name) newick += node.name;
  if (node.length) newick += `:${node.length}`;
  if (isRoot < 0) newick += `;`;

  return newick;
};

// TODO: make sure the outputted json is compatible with similar libraries:
// - https://github.com/octav47/NewickJS (typescript)
// - https://github.com/daviddao/biojs-io-newick (javascript)
// - https://pypi.org/project/newick/ (python)
// - https://github.com/iosonofabio/newick_to_json (python)
// - https://pypi.org/project/newick-visualizer/1.0.2/ (python)
// - NexSON (https://github.com/OpenTreeOfLife/phylesystem-api/wiki/HoneyBadgerFish)
// - https://gist.github.com/Ad115/34dfc6560b64779a40c1a929f560511b (python)
