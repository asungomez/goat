import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    videosFolder: 'cypress/videos/component',
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-failed-log/on')(on);
    },
    baseUrl: 'http://localhost:3000',
    videosFolder: 'cypress/videos/e2e',
  },
});
