import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../../support/commands"; // Ensure custom commands are loaded

// Load user and product data from testData.json fixture
let testData: any;

before(() => {
  cy.fixture("testData.json").then((data) => {
    testData = data;
  });
});

let authToken: string | null = null;
let addedProducts: string[] = [];

Given("User logins programmatically with valid credentials", () => {
  cy.fixture("testData.json").then((data) => {
    const validUser = data.validUser;
    cy.loginViaAPI(validUser.username, validUser.password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body?.token || response.body?.auth_token || null;
      if (authToken) {
        cy.setCookie('tokenp_', authToken);
      }
      cy.window().then(win => {
        win.localStorage.setItem('username', validUser.username);
      });
    });
  });
});

When('User adds {string} to cart via API', (productName: string) => {
  cy.fixture("testData.json").then((data) => {
    const product = data.products.find((p: any) => p.name === productName);
    expect(product, `Product: ${productName} exists`).to.not.be.undefined;
    cy.request({
      method: 'POST',
      url: 'https://api.demoblaze.com/addtocart',
      body: {
        id: "1",
        cookie: authToken,
        prod_id: product.id,
        prod_name: product.name
      },
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      expect(res.status).to.eq(200);
      addedProducts.push(product.name);
    });
  });
});

Then('both items should be present in the cart', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/viewcart',
    body: { cookie: authToken },
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('Items');
    const cartItems = res.body.Items.map((item: any) => item.title);
    expect(cartItems).to.include.members(addedProducts);
  });
});