import { defineConfig } from 'vitest/config'
export default defineConfig({
    test: {
        globals: true, // Enable global variables for Vitest
        environment: 'jsdom', // Use jsdom for DOM testing
        setupFiles: './src/setupTests.ts', // Optional: Path to setup file
        coverage: {
          provider: 'v8', // Use V8 for code coverage
        },
    }
});