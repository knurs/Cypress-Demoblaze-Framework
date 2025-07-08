import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly selectors = {
    categoriesMenu: '#cat',
    categoryItems: '.list-group-item',
    productCards: '.card',
    productTitles: '.card-title',
    productPrices: '.card-text',
    addToCartButton: '.btn-success',
    loginLink: '#login2',
    cartLink: '#cartur',
    productLink: '.hrefch'
  };
  
  constructor() {
    super('/');
  }
  
  getCategories(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.categoryItems);
  }
  
  getCategoryByName(categoryName: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.categoryItems).contains(categoryName);
  }
  
  getProductCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.productCards);
  }
  
  getProductPrices(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.productPrices);
  }
  
  clickProduct(productName: string): void {
    // First wait for products to be loaded
    cy.get(this.selectors.productCards).should('have.length.greaterThan', 0);
    
    // Find the product card that contains the specified product name
    cy.get(this.selectors.productCards).contains(this.selectors.productTitles, productName)
      .should('exist', `Product "${productName}" should be visible on the page`)
      .within(() => {
        // Within the product card, click on the product link (not just the title)
        cy.get(this.selectors.productLink).should('be.visible').click();
      });
    
    // Wait a moment for navigation and verify we navigated to product detail page
    cy.wait(1000);
    // Verify we're on a product detail page by checking for Add to cart button
    cy.get(this.selectors.addToCartButton).should('be.visible');
  }
  
  clickAddToCart(): void {
    cy.get(this.selectors.addToCartButton).click();
  }
  
  clickLogin(): void {
    cy.get(this.selectors.loginLink).click();
  }
  
  clickCart(): void {
    cy.get(this.selectors.cartLink).click();
  }
  
  verifyProductPricesVisible(): void {
    this.getProductCards().each(($card) => {
      cy.wrap($card).within(() => {
        cy.get(this.selectors.productPrices).should('be.visible').and('contain', '$');
      });
    });
  }
}