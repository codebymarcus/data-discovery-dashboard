module.exports = {
  preset: 'ts-jest', // Use ts-jest if you're testing TypeScript
  testEnvironment: 'jsdom', // Use jsdom for React component tests
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript/JSX files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  }
};
