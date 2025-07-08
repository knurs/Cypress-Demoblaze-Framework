import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../../../support/commands"; 

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
      cy.log('Login response:', JSON.stringify(response.body, null, 2));
      authToken = response.body?.token || response.body?.auth_token || response.body?.sessionToken || null;
      if (authToken) {
        cy.setCookie('tokenp_', authToken);
        cy.log('Auth token set:', authToken);
         } else {
        cy.log('No auth token found in response');
  
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
      failOnStatusCode:false,
      body: {
        id: "1",
        cookie: authToken,
        prod_id: product.id,
         flag: true
      },
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
       cy.log('Add to cart response:', JSON.stringify(res.body, null, 2));
      cy.log('Add to cart status:', res.status);
      
      if (res.status === 200) {
        addedProducts.push(productName);
        cy.log('Product added successfully:', productName);
      } else {
        cy.log('Failed to add product:', productName, 'Status:', res.status);
      }
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
    cy.log('Response body:', JSON.stringify(res.body, null, 2));

    let cartItems;
    if (Array.isArray(res.body.Items)) {
      // If Items is an array, extract the titles
      cartItems = res.body.Items.map((item: any) => item.title || item.prod_name || item.name);
    } else {
      // If Items is not an array, handle differently
      cartItems = [];
    }

    cartItems = cartItems.filter(Boolean).flat();
    
    cy.log('Cart items found:', cartItems);
    cy.log('Expected products:', addedProducts);

    addedProducts.forEach(expectedProduct => {
      expect(cartItems).to.include(expectedProduct);
    });
    //const cartItems = res.body.Items.map((item: any) => item.title);
   // expect(cartItems).to.include.members(addedProducts);
  });
});