module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    extends: [
      'react-app',
      'react-app/jest',
      "mantine"
    ],
    root: true,
    env: {
      node: true,
    },
    ignorePatterns: ['.eslintrc.js'],
  };
  