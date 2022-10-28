# Fashion Items API
postman documentation url : https://documenter.getpostman.com/view/23762728/2s8YCbovdi
This Fashion items API collection includes 2 folders:

# The User folder consists of 2 endpoints:

--Signup endpoint: a POST request that accepts the user details as body and returns a response code, response message and a bearer JWT token.

--Login endpoint: a POST request that accepts the user login details with bearer authentication and returns the response code, response message and the user saved details

# The Fashion items folder consists of 5 endpoints:

--Create a fashion item endpoint : POST request that creates a fashion item in the database with the data entered by user. limited to [name, quantity, price, description].

--Update a fashion item endpoint: Put request that updates the fashion item in the database with the given parameters

--Get all fashion items endpoint to get all the fashion items in the data base

--Get fashion item by name endpoint to get item by given name

--Delete fashion item endpoint : DELETE request to delete a fashion item from the database.
