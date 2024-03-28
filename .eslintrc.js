/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['universe', 'eslint:recommended', '@react-native'],
  plugins: ['@stylistic', 'unused-imports'],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-shadow': 'off',
  },
  ignorePatterns: ['node_modules', '.vscode', '.expo', '.git', '*.config.js'],
};
