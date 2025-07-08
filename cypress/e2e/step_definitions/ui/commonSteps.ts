import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../pages/HomePage";   
const homePage = new HomePage();

Given('User is on the homepage', () => {
  homePage.visit();
  homePage.waitForPageLoad();
 
});
Given('User logged in with valid credentials', () => {
  cy.fixture('testData').then((users) => {
    cy.loginViaUI(users.validUser.username, users.validUser.password);
  });
});

When('User views the categories menu', () => {
  // Categories are loaded with the page
  cy.wait(1000); // Wait for dynamic content
});

When('User views the product listings', () => {
  // Products are loaded with the page
  cy.wait(2000); // Wait for products to load
});

When('User clicks on a product', () => {
  // Click on the first available product
  cy.get('.card-title').first().click();
  cy.wait(1000);
});

When('User clicks "Add to cart" button', () => {
  // Set up the alert stub before clicking the button that triggers the alert
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
  });
  
  homePage.clickAddToCart();
});