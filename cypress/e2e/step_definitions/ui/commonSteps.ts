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
    cy.wait(3000);
  
  // Handle any Chrome password popup first
  cy.handleChromePasswordPopup();
  cy.wait(2000);
  
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
  //cy.get('.card-title').should('be.visible').first().click();
  homePage.clickProduct('Samsung galaxy s6');
  cy.wait(3000);

});

When('User clicks "Add to cart" button', () => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
  });
  cy.wait(2000);
  homePage.clickAddToCart();
});

