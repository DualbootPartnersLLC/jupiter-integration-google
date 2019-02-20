module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["<rootDir>/**/*.test.{js,ts}"],
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: false,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};
