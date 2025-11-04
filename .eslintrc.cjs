module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
  },
};
