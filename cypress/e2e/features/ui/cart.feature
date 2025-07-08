Feature: Cart Functionality
Logged in valid user wants to add products to cart

  Background:
    Given User logged in with valid credentials

  Scenario: Add product to cart and verify popup
    Given User is on the homepage
    When User clicks on a product
    And User clicks "Add to cart" button
    Then User should see a popup with text "Product added."