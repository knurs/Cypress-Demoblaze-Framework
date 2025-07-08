import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('User should see a popup with text {string}', (expectedText: string) => {
 
  cy.get('@windowAlert').should('have.been.calledWith', expectedText);
});