Feature: Homepage categories

  Scenario: Display correct categories
    Given User is on the homepage
    Then User should see exactly 3 categories
    When User views the categories menu
    Then Categories displayed should be "Phones", "Laptops", and "Monitors"
     

Scenario: Verify all products show price tags
    Given User is on the homepage
    When User views the product listings
    Then all products should display price tags with "$" symbol 