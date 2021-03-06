import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    roots: [
        "<rootDir>/test",
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jsdom",
    // when the program meets .jpg or .css
    // do nothing and go to the trivial file mockFile
    moduleNameMapper: {
        "\\.(jpg)$":"<rootDir>/test/mockFile.ts",
        "\\.(css)$":"<rootDir>/test/mockFile.ts"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        // excluding all code in services from the coverage report
        // '!' means 'not'
        '!src/services/**',
        '!src/react-app-env.d.ts'
    ]
}

export default config;