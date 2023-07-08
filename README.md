<h1> Shopping Cart API README </h1>
This README provides instructions on how to install, configure and use the Shopping Cart API application on your local machine.

<h2>Installation</h2>
To install the Shopping Cart API on your local machine, following these steps:
<ol>
    <li>Open a terminal window</li>
    <li>Make a directory for the application using the following command:</li>
    `mkdir shopping_cart_api_clone`
    <li>Navigate to the directory where you want to install the Shopping Cart API application</li>
    <li>Clone the Github repository to your local machine using the following command:
    <br> `git clone git@github.com:mimo217/unit2_project_shoppingcart_api.git`
    <li>Install Node.js on your local machine. You can download the Node.js installer from the official Node.js website: https://nodejs.org/en/download/</li>
    <li>Install MongoDB on your local machine. You can download the MongoDB installer from the official MongoDB website: https://www.mongodb.com/try/download/community</li>
    <li>Install Postman on your local machine. You can download the Postman installer from the official Postman website: https://www.postman.com/downloads/</li>
    <li>Install Git on your local machine. You can download the Git installer from the official Git website: https://git-scm.com/downloads</li>
  <li>Navigate to the project directory:
  <br>`cd unit2_project_shoppingcart_api`
  </li>
  <li>Install the dependencies by running the following command:</li>
  `npm install`
  <li>Once installation is complete, open the project in VS code by running the following command:</li>
  `code .`

  </li>
  </ol>
  <h2>Configuration</h2>
  Before running the application, you need to perform some configuration steps:
  <ol>
  <li>Create a `env` file in the root directory of the project
  </li>
  <li>Set the following environment variables in the `.env` files:
  <br>`MONGO_URI=mongodb://`your_mongodb_connection_url`
  <br>SECRET=`your_secret_key`
  <br>Replace ``your_mongodb_connection_url`` with the connection string for your MongoDB database, and `your_secret_key` with a secret key of your choice.
  </li>
  </ol>

  <h2>Starting the Application in Development Mode</h2>
  To start the application in development mode, follow these steps:
  <ol>
  <li>Ensure that the MongoDB service is running on your local machine.</li>
  <li>Run the following command:</li>
  `npm run dev`
  <li>This will start the application on the specified port(3000) in development mode.</li>
  </ol>

  <h2>Making API Request with Postman</h2>
  To make API requests to the Shopping Cart API using Postman, follow these steps:
  <ol>
  <li>Open Postman</li>
  <li>Set the HTTP(GET, POST, DELETE, etc.) and enter the API endpoint URL. The available endpoints are defined in the `itemRoutes.js` and `userRoutes.js` files.</li>

  <br>Endpoints:
  <ul>

  <li>Register a new user: `POST / users/register`</li>
  <li>Login a user: `POST /users/login`</li>
  <li>Get user profile: `GET /user/profile/:id`</li>
  <li>Logout a user: `POST /users/logout</li>
  <li>Delete a user: `Delete /users/:id`</li>
  <li>Get user's cart by ID: `GET /users/cart/:userid`</li>
  <li>Add an item to user's cart: `POST /users/:userid/item/:itemid`</li>
  <li>Remove an item from user's cart: `DELETE /users/:userid/item/:itemid`</li>
  <li>Get item list: `Get /items`</li>
  <li>Get item by ID: `Get /items/:id`</li>
  <li>Create a new item: POST /items`</li>
  <li>Update an item: `PUT /items/:id`</li>
  <li>Delete an item: DELETE /items/:id</li>
  </ul>
Replace :id, :userid, and :itemid with the appropriate values for your request.

  <li>Set the required header, `Authorization`. The `Authorizaton` header should have the value `Bear token`, where `token` is the JWT token obtained during user authentication.This header is necessary for authenticated requests. You can include the header by clicking on the "Headers" tab in Postman, adding a new header with "Authorization" as the key, and `Bearer token` as the value. </li>
  <li>Send the request by clicking the "Send" button. Postman will execute the request and display the response in the "Response" section below and . You can view the response body, headers, and status code in this section.</li>

  <br>Be sure to replace the placeholder values (:id, :userid, :itemid, and YOUR_JWT_TOKEN) with the actual values for your specific request.
  </ol>

  <h2>Running Tests</h2>
  To run the tests for the Shopping Cart API, follow these steps:
  <ol>
  <li> Ensure that the MongoDB service is running on your local machine.</li>
  <li> Open a seperate terminal, run the following command:</li>
  `npm run test`
  <li>This will execute the test scripts defined in the item.js and user.test.js files and display the test results.</li>
 </ol>

<h2>Starting the Application without Development Mode</h2>
To start the application without development mode, follow these steps:</h2>
<ol>
<li>Ensure that the MongoDB service is running on your local machine</li>
<li>Run the following command:</li>
`npm start`
<li>This will start the application on the specified port (default: 3000) without development mode.
</ol>

<h2>Wireframe</h2>
<a href="https://imgur.com/6lVoFiN"><img src="https://i.imgur.com/6lVoFiN.png" title="source: imgur.com" /></a>

Trello board can be found <a href="https://trello.com/b/Eb12CHDz/shopping-cart-api">here</a>