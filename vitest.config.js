import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Shows individual test results
    verbose: true,

    // Coverage reporting
    coverage: {
      enabled: true,
      exclude: [
        'node_modules/',
        './src/database/migrations',
      ],
    },

    setupFiles: ['./src/config.ts'],

    timeout: 30000,

    // Include tests only from __tests__ directory
    include: ['__tests__/**/*.{test,spec}.{ts,js}'],

    exclude: ['node_modules/'],

    // Treat these as ESM
    globals: true,
  },

  // Optional: path aliases if you used moduleNameMapper
  resolve: {
    alias: {
      // Example: replace if you have any aliases
      // '@/': '/src/',
    },
  },
});
