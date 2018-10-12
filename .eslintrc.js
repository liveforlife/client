/*
  https://eslint.org/docs/user-guide/configuring
  通用规则修改需要通知所有人
 */

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: true
      }
    ],
    'max-len': [1, 100],
    "max-statements":[1, 100],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
  }
}
