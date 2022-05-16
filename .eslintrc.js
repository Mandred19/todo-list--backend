module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'no-empty': 0,
    semi: 2,
    'no-var': 'error',
    'arrow-body-style': 0,
    camelcase: 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    indent: 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/order': 0,
    'import/extensions': 0,
    'import/first': 0,
    'linebreak-style': 0,
    'max-len': [2, {code: 120}],
    'no-console': [1, {allow: ['warn', 'error']}],
    'no-debugger': 1,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-multiple-empty-lines': [2, {max: 1, maxBOF: 3, maxEOF: 1}],
    quotes: [2, 'single', {allowTemplateLiterals: true}],
  },
};
