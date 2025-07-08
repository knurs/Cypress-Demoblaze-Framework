import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('User should see a popup with text {string}', (expectedText: string) => {
  // Verify the alert was called with expected text
  cy.get('@windowAlert').should('have.been.calledWith', expectedText);
});

// Keep the old step definition for backward compatibility if needed
Then('I should see a popup with text {string}', (expectedText: string) => {
  cy.get('@windowAlert').should('have.been.calledWith', expectedText);
});