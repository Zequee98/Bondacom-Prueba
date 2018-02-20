module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "rules": {
    "no-const-assign": "warn",
    "no-undef": "warn",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "max-len": ["error", { "code": 150 }],
    "space-before-function-paren": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "keyword-spacing": [2, {"before": true, "after": true}],
    "comma-dangle": "off",
    "arrow-parens":"off"
  }
}
