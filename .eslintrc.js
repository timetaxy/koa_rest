module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    // es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 0,
    'keyword-spacing': 0,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    semi: ['warn', 'always'],
    '@typescript-eslint/no-var-requires': 'ignore',
  },
};
