module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import', '@next/next'],
  root: true,
  rules: {
    'no-unused-vars': 0, // replaced by @typescript-eslint/no-unused-vars
    'import/no-default-export': 'error',
    '@typescript-eslint/consistent-type-imports': ['error', {fixStyle: 'inline-type-imports'}],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': ['error', {args: 'none'}],
  },
  overrides: [
    {
      files: ['src/pages/*.tsx', 'src/pages/**/*.ts', 'src/pages/**/*.tsx'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
};
