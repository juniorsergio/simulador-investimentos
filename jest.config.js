module.exports = {
    testPathIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: [
        "<rootDir>/jest-setup.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.tsx',
        '!src/**/*.test.tsx',
        '!src/**/App.tsx',
        '!src/**/main.tsx',
        '!src/stories/*'
    ],
    coverageReporters: ['lcov', 'json']
}