import { Given, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../pages/HomePage";   
const homePage = new HomePage();


// Scenario: Display correct categories
// This step verifies that the categories displayed on the homepage match the expected values.
Then('User should see exactly {int} categories', (expectedCount: number) => {
  homePage.getCategories().should('have.length', expectedCount);
});


Then ('Categories displayed should be {string}, {string}, and {string}', 
  (cat1: string, cat2: string, cat3: string) => {
    homePage.getCategoryByName(cat1).should('be.visible');
    homePage.getCategoryByName(cat2).should('be.visible');
    homePage.getCategoryByName(cat3).should('be.visible');
  }
);

Then('all products should display price tags with "$" symbol', () => {
  homePage.verifyProductPricesVisible();
});