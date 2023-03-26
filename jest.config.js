const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}'],
};

module.exports = createJestConfig(customJestConfig);
