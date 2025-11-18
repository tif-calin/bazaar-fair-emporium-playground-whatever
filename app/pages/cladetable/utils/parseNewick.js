const RE_LENGTH = /:(?<len>[\d.]+)$(?!.*:)/;
const RE_NEWICK_TOKENS = /\s*(;|,|\(|\))\s*/;
const RE_FINAL_SEMICOLON = /;$/;

/**
 * @typedef {{
 *   children?: NewickNode[];
 *   name?: string;
 *   length?: number;
 * }} NewickNode
 */

/**
 * @param {string} newick
 * @returns {NewickNode}
 */
const parseNewick = (newick) => {
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

export default parseNewick;
