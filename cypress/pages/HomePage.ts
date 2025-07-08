import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly selectors = {
    categoriesMenu: '#cat',
    categoryItems: '.list-group-item',
    productCards: '.card',
    productTitles: '.card-title',
    productPrices: '.card-block',
    addToCartButton: '.btn.btn-success.btn-lg',
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
    cy.get(this.selectors.productTitles , { timeout: 10000 }).contains(productName).click();
  }
  
  clickAddToCart(): void {
    cy.get(this.selectors.addToCartButton , { timeout: 10000 }).should('be.visible').click();
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