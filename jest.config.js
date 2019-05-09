module.exports = {
  transform: {
    '.(ts|tsx)':
      '/Users/idol/Code/redux-combine-reducers-immutable/node_modules/ts-jest/dist/index.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['<rootDir>/test/**/*.(spec|test).{ts,tsx}'],
  testURL: 'http://localhost',
  rootDir: '/Users/idol/Code/redux-combine-reducers-immutable',
  watchPlugins: [
    '/Users/idol/Code/redux-combine-reducers-immutable/node_modules/jest-watch-typeahead/filename.js',
    '/Users/idol/Code/redux-combine-reducers-immutable/node_modules/jest-watch-typeahead/testname.js',
  ],
};
