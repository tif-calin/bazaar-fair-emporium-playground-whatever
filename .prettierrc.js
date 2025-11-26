// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: "avoid",
  embeddedLanguageFormatting: "off", // I don't like how prettier formats my CSS inside of styled components
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
};

export default config;
