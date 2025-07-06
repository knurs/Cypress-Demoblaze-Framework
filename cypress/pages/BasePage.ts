export abstract class BasePage {
  protected url: string;
  
  constructor(url: string) {
    this.url = url;
  }
  
  visit(): void {
    cy.visit(this.url);
  }
  
  getTitle(): Cypress.Chainable<string> {
    return cy.title();
  }
  
  waitForPageLoad(): void {
    cy.get('body').should('be.visible');
  }
  
  takeScreenshot(name: string): void {
    cy.screenshot(name);
  }
}