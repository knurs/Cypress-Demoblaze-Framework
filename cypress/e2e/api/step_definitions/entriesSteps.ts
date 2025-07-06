import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let response: any;

When("User sends GET request to {string}", (endpoint: string) => {
  cy.request(endpoint).then((res) => {
    response = res;
  });
});

Then("response status should be {int}", (statusCode: number) => {
  expect(response.status).to.eq(statusCode);
});

Then("response body should contain {int} items", (count: number) => {
  expect(response.body.Items.length).to.eq(count);
});
