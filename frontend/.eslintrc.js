const importOrder = require('./import-order.json');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'sonarjs',
  ],
  rules: {
    'import/order': importOrder,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/no-identical-expressions': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_id',
        ],
      },
    ],
  },
};
