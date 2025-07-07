import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import mochawesome from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  e2e: {
    baseUrl: "https://www.demoblaze.com",
    specPattern: 'cypress/e2e/features/**/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents: async (on, config) => {
      console.log('>>> Step definition pattern from cucumber config is being used');
      await addCucumberPreprocessorPlugin(on, config); // ✅ no stepDefinitions here
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      mochawesome(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
  },
});
