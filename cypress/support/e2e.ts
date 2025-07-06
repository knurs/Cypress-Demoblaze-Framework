import 'cypress-mochawesome-reporter/register';
import './commands';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions
  return false;
});

// Custom commands registration
declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUI(username: string, password: string): Chainable<void>;
      loginViaAPI(username: string, password: string): Chainable<any>;
    }
  }
}