module.exports = {
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "extends": [
    "eslint:recommended",
    "prettier",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "import"],
  "rules": {
    "capitalized-comments": "off",
    "camelcase": "off",
    "curly": ["error", "all"],
    "id-length": "off",
    "max-lines-per-function": "off",
    "max-statements": "off",
    "multiline-comment-style": "off",
    "no-bitwise": "off",
    "no-magic-numbers": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "one-var": "off",
   "padded-blocks": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {},
    }
  }
}
