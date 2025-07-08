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

When('User clicks on {string} product', (productName: string) => {
  // Wait for products to load properly
  cy.get('.card').should('have.length.greaterThan', 0);
  cy.wait(2000); // Wait for products to fully load
  
  // Use the HomePage method to click on the specified product
  homePage.clickProduct(productName);
});

When('User clicks on product {string}', (productName: string) => {
  // Wait for products to load properly
  cy.get('.card').should('have.length.greaterThan', 0);
  cy.wait(2000); // Wait for products to fully load
  
  // Use the HomePage method to click on the specified product
  homePage.clickProduct(productName);
});

When('User clicks "Add to cart" button', () => {
  homePage.clickAddToCart();
});