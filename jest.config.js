const base = require('./config/jest.config.base.js')

module.exports = {
  ...base,

  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },

  roots: ['<rootDir>/scripts', '<rootDir>/src'],

  snapshotSerializers: ['enzyme-to-json/serializer'],
  // Run the test setup file
  setupTestFrameworkScriptFile: '<rootDir>/config/jest-setup/index.js',

  testMatch: ['<rootDir>/src/**/__tests__/index.js'],

  // jest-watch typeahead suggestions
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
