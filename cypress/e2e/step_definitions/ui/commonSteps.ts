import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../pages/HomePage";   
import { ProductPage } from "../../../pages/ProductPage";   

const homePage = new HomePage();
const productPage = new ProductPage();

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
  // Click on the first available product using the correct selector
  homePage.clickFirstAvailableProduct();
  
  // Wait for navigation to product page
  productPage.waitForProductPageLoad();
});

When('User clicks "Add to cart" button', () => {
  // Set up alert stub before clicking add to cart
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
  });
  
  productPage.clickAddToCart();
});