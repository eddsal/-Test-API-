Feature: User

    Scenario: I should see all users
        When I request "GET" "/users"
        Then I should have an empty array
        And I should have an array with 0 elements
    
    Scenario: I should create a new user
        Given I have payload
            | name  | test |
        When I request "POST" "/articles" with payload
        Then The response status should be 201
        And I should have an object with the following attributes
            | name | test |
        And I should have the "id" attribute
    
    Scenario: I should retrieve the user user1
        When I request "GET" "/users/{{user2.id}}"
        Then The response status should be 200
        And I should have an object with the following attributes
            | name | User2 |
    
    Scenario: I should not retrieve the product unknown
        When I request "GET" "/users/-1"
        Then The response status should be 404
        And I should have an empty body

    Scenario: I should get all users
        Given I load fixtures "user.json"
        And I am authenticated with "user1"
        When I request "GET" "/users/{{user1.id}}"
        And I should have an object with the following attributes
            | name | {{product2.name}} |

