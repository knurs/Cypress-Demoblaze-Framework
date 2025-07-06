import { API_ENDPOINTS } from './endpoints';

export class ApiHelper {
  private authToken: string | null = null;
  
  makeRequest(method: string, endpoint: string, body?: any): Cypress.Chainable<any> {
    const options: any = {
      method,
      url: `${API_ENDPOINTS.BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    if (this.authToken) {
      options.headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    
    return cy.request(options);
  }
  
  login(username: string, password: string): Cypress.Chainable<any> {
    const loginData = {
      username: btoa(username),
      password: btoa(password)
    };
    
    return this.makeRequest('POST', API_ENDPOINTS.LOGIN, loginData)
      .then((response) => {
        if (response.status === 200) {
          this.authToken = response.body.Auth_token;
        }
        return response;
      });
  }
  
  getEntries(): Cypress.Chainable<any> {
    return this.makeRequest('GET', API_ENDPOINTS.ENTRIES);
  }
  
  getCategoryItems(category: string): Cypress.Chainable<any> {
    return this.makeRequest('POST', API_ENDPOINTS.CATEGORIES, { cat: category });
  }
  
  addToCart(productId: number): Cypress.Chainable<any> {
    const cartData = {
      id: crypto.randomUUID(),
      cookie: crypto.randomUUID(),
      prod_id: productId,
      flag: true
    };
    
    return this.makeRequest('POST', API_ENDPOINTS.ADD_TO_CART, cartData);
  }
  
  viewCart(cookie: string): Cypress.Chainable<any> {
    return this.makeRequest('POST', API_ENDPOINTS.VIEW_CART, { cookie });
  }
}