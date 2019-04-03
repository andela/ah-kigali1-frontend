module.exports = {
  setupFiles: ["<rootDir>/enzyme.config.js", "jest-localstorage-mock"],
  moduleFileExtensions: ["js", "json", "jsx"],
  coverageDirectory: "coverage",
  testMatch: ["**/?(*.)+(spec|test).js?(x)"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/__tests__/**",
    "!src/index.js"
  ],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__tests__/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js"
  },
  verbose: true
};
