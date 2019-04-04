module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover']
};
