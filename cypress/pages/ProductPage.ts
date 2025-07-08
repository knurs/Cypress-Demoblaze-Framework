import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private readonly selectors = {
    productTitle: '.name',
    productPrice: '.price-container',
    addToCartButton: '.btn-success',
    productDescription: '#more-information',
    productImage: '.product-image'
  };
  
  constructor() {
    super('/prod.html');
  }
  
  waitForProductPageLoad(): void {
    // Wait for product title to be visible
    cy.get(this.selectors.productTitle).should('be.visible');
    // Wait for add to cart button to be visible and enabled
    cy.get(this.selectors.addToCartButton).should('be.visible').and('not.be.disabled');
  }
  
  getProductTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.productTitle);
  }
  
  getProductPrice(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.productPrice);
  }
  
  clickAddToCart(): void {
    // Wait for the button to be available and click it
    cy.get(this.selectors.addToCartButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }
  
  verifyProductDetailsVisible(): void {
    this.getProductTitle().should('be.visible');
    this.getProductPrice().should('be.visible');
    cy.get(this.selectors.addToCartButton).should('be.visible');
  }
}