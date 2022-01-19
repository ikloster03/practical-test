module.exports = {
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:security/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    'security',
  ],
  rules: {
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'var', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'no-console': 'error',
    'func-names': 'off',
    'jest/expect-expect': 'off',
    'security/detect-object-injection': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
      alias: {
        map: [
          ['@', `${__dirname}/src`],
        ],
        extensions: ['.js'],
      },
    },
  },
};
