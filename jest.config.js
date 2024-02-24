/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    verbose: true,
    collectCoverage: true,
    setupFiles: [
        './src/config.ts'
    ],
    testTimeout: 30000,
    preset: 'ts-jest',
    roots: ['./__tests__'],
    testPathIgnorePatterns: [
        "\\\\node_modules\\\\"
    ],
    coveragePathIgnorePatterns: [
        "\\\\node_modules\\\\"
    ],
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    }
}
