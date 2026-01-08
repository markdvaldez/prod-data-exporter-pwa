import type { Config } from "jest";
import nextJest from "next/jest.js";

process.env.TZ = "UTC";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.d.ts",
    "!src/**/index.{ts,tsx,js,jsx}",
    "!src/**/*.stories.{ts,tsx,js,jsx}",
    "!src/tests/**",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    luxon: "<rootDir>/node_modules/luxon/build/cjs-browser/luxon.js",
    "^lucide-react$": "<rootDir>/__mocks__/lucide-react.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(redux-persist)/)"],

  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "coverage",
        outputName: "junit.xml",
      },
    ],
  ],
  coverageReporters: ["text", "text-summary", "lcov", "html", "cobertura"],
  globals: {
    TZ: "UTC",
  },
};

export default createJestConfig(config);
