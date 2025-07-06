Cypress.Commands.add('loginViaUI', (username: string, password: string) => {
  cy.visit('/');
  cy.get('#login2').click();
  cy.get('#loginusername').type(username);
  cy.get('#loginpassword').type(password);
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