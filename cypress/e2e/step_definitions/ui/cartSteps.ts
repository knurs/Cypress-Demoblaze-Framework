import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see a popup with text {string}', (expectedText: string) => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
  });
  
  cy.get('@windowAlert').should('have.been.calledWith', expectedText);
});