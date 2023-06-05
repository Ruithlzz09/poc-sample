module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
  ignorePatterns: [
    'scripts',
    'test',
    'tests',
    'coverage',
    'mochawesome-report',
  ],
  rules: {
    // ...other ESLint rules...
    'prettier/prettier': 'error',
    'max-len': [1, { code: 80 }],
  },
};
