import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let lastResponse: Cypress.Response<any>;

When('User makes a request to get items for category {string}', (category: string) => {
  cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/bycat',
    body: { cat: category },
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    lastResponse = response;
    cy.wrap(response).as('lastResponse');
  });
});

Then('the response should have status code 200', () => {
  cy.get('@lastResponse').then((response: any) => {
    expect(response.status).to.eq(200);
  });
});

Then('the response should contain exactly {int} items', (count: number) => {
  cy.get('@lastResponse').then((response: any) => {
    expect(response.body).to.have.property('Items');
    expect(response.body.Items).to.have.length(count);
  });
});