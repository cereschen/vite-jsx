module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'newline-after-var': 2,
    'newline-before-return':2,
    'lines-around-directive':2,
    'keyword-spacing':2,
    'space-infix-ops':2,
    'comma-spacing':2,
    'block-spacing':2,
    '@typescript-eslint/no-empty-interface':0,
  },
};
