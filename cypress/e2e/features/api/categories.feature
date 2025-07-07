
Feature: Categories API
 To verify correct item counts per category

  Scenario Outline: Verify item count for each category
    When User makes a request to get items for category "<category>"
    Then the response should have status code 200
    And the response should contain exactly <count> items

    Examples:
      | category | count |
      | phone    | 7     |
      | notebook | 6     |
      | monitor  | 2     |