export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  collectCoverage: true,
  coverageDirectory: 'coverage'
};
