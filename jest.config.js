module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts', // Adjust this pattern to match your source files
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
  ],
  coverageDirectory: 'coverage', // Directory where coverage reports will be saved
  coverageReporters: ['text', 'lcov'], // Specify coverage report formats
};