import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('User should see a popup with text {string}', (expectedText: string) => {
  // The alert stub should already be set up before the action that triggers the alert
  // We just need to verify it was called with the expected text
  cy.get('@windowAlert').should('have.been.calledWith', expectedText);
});