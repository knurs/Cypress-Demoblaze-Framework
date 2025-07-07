Feature: Cart API
To verify cart operations work correctly

Scenario: Login and add products to cart via API
    Given User logins programmatically with valid credentials
    When User adds "Samsung galaxy s6" to cart via API
    And User adds "HTC One M9" to cart via API
    Then both items should be present in the cart