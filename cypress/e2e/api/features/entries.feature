Feature: Entries API

  Scenario: Get entries should return 9 items
    When User sends GET request to "/entries"
    Then response status should be 200
    And response body should contain 9 items
