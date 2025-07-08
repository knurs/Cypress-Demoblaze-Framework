import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('User should see a popup with text {string}', (expectedText: string) => {
  // Verify the alert was triggered with the expected text
  // The alert stub was set up in the previous step before clicking "Add to cart"
  cy.get('@windowAlert').should('have.been.calledWith', expectedText);
});