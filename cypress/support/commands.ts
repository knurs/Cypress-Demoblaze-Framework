Cypress.Commands.add('loginViaUI', (username: string, password: string) => {
  cy.visit('/');
  cy.get('#login2').click().wait(1000);
  cy.get('#loginusername').type(username).wait(1000);
  cy.get('#loginpassword').type(password).wait(1000);
  cy.get('button[onclick="logIn()"]').click();
  cy.wait(2000);
});

Cypress.Commands.add('loginViaAPI', (username: string, password: string) => {
  const loginData = {
    username: btoa(username),
    password: btoa(password)
  };
  
  return cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/login',
    body: loginData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
});
// New custom command to handle Chrome password popup
Cypress.Commands.add('handleChromePasswordPopup', () => {
  cy.get('body').then(($body) => {
    // Multiple selectors to catch different variations of the password popup
    const passwordPopupSelectors = [
      'button:contains("OK")',
      'button:contains("Save")',
      'button:contains("Never")',
      '[data-testid="password-manager-dialog"] button',
      '.password-manager-dialog button',
      '[role="dialog"] button:contains("OK")'
    ];
    
    let foundPopup = false;
    
    passwordPopupSelectors.forEach(selector => {
      if (!foundPopup && $body.find(selector).length > 0) {
        cy.log(`Chrome password popup detected with selector: ${selector}`);
        cy.get(selector).first().click({ force: true });
        foundPopup = true;
        cy.wait(500);
      }
    });
    
    if (!foundPopup) {
      cy.log('No Chrome password popup detected');
    }
  });
});
// New custom command to handle Chrome password popup
Cypress.Commands.add('handleChromePasswordPopup', () => {
  cy.get('body').then(($body) => {
    // Multiple selectors to catch different variations of the password popup
    const passwordPopupSelectors = [
      'button:contains("OK")',
      'button:contains("Save")',
      'button:contains("Never")',
      '[data-testid="password-manager-dialog"] button',
      '.password-manager-dialog button',
      '[role="dialog"] button:contains("OK")'
    ];
    
    let foundPopup = false;
    
    passwordPopupSelectors.forEach(selector => {
      if (!foundPopup && $body.find(selector).length > 0) {
        cy.log(`Chrome password popup detected with selector: ${selector}`);
        cy.get(selector).first().click({ force: true });
        foundPopup = true;
        cy.wait(500);
      }
    });
    
    if (!foundPopup) {
      cy.log('No Chrome password popup detected');
    }
  });
});