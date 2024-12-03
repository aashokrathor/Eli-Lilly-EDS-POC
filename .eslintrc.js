module.exports = {
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': "off", // require js file extensions in imports
    'linebreak-style': "off", // enforce unix linebreaks
    'no-param-reassign': "off", // allow modifying properties of param
  },
};
