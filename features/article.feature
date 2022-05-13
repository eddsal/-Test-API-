Feature: Article

    Scenario: I should see all articles
        When I request "GET" "/articles"
        Then I should have an empty array
        And I should have an array with 0 elements
    
    Scenario: I should create a new article
        Given I have payload
            | name  | test |
        When I request "POST" "/articles" with payload
        Then The response status should be 201
        And I should have an object with the following attributes
            | name | test |
        And I should have the "id" attribute
    
    Scenario: I should retrieve the product product1
        When I request "GET" "/articles/{{article1.id}}"
        Then The response status should be 200
        And I should have an object with the following attributes
            | name | Article1 |
    
    Scenario: I should not retrieve the product unknown
        When I request "GET" "/articles/-1"
        Then The response status should be 404
        And I should have an empty body

    Scenario: I should get all articles
        Given I load fixtures "article.json"
        And I am authenticated with "user2"
        When I request "GET" "/articles/{{article3.id}}"
        And I should have an object with the following attributes
            | name | {{article2.name}} |

