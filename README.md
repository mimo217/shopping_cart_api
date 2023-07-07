<h1> Shopping Cart API README </h1>
This README provides instructions on how to install, configure and use the Shopping Cart API application on your local machine.

<h2>Installation</h2>
To install the Shopping Cart API on your local machine, following these steps:
<ol>
****include opening terminal instructions
    <li>Open a terminal window</li>
    <li>Navigate to the directory where you want to install the Shopping Cart API application</li>
    <li>Clone the Github repository to your local machine using the following command:
    <br> `gh repo clone mimo217/unit2_project_shoppingcart_api`
    <li>Install Node.js on your local machine. You can download the Node.js installer from the official Node.js website: https://nodejs.org/en/download/</li>
    <li>Install MongoDB on your local machine. You can download the MongoDB installer from the official MongoDB website: https://www.mongodb.com/try/download/community</li>
    <li>Install Postman on your local machine. You can download the Postman installer from the official Postman website: https://www.postman.com/downloads/</li>
    <li>Install Git on your local machine. You can download the Git installer from the official Git website: https://git-scm.com/downloads</li>
    <li>Open a terminal window</li>
    <li>Navigate to the directory where you want to install the Shopping Cart API application</li>

  <li>Clone the Github repository to your local machine using the following command:
  <br> `git clone https://github.com/mimo217/unit2_project_shoppingcart_api.git`
  </li>
  <li>Navigate to the project directory:
  <br>`cd shopping_cart_api`
  </li>
  <li>Install the dependencies by running the following command:
  <br> `npm install`
  </li>
  <h2>Configuration</h2>
  Before running the application, you need to perform some configuration steps:
  <li>Create a `env` file in the root directory of the project
  </li>
  <li>Set the following environment variables in the `.env` files:
  <br>`MONGO_URI=<your_mongodb_connection_string>
  SECRET=<your_secret_key>
  <br>Replace `<your_mongodb_connection_string>` with the connection string for your MongoDB database, and `<your_secret_key>` with a secret key of your choice.
  </li>
  <h2>Starting the Application in Development Mode</h2>
  To start the application in development mode, follow these steps:
  <li>Ensure that the MongoDB service is running on your local machine.</li>
  <li>Run the following command:
  <br>`npm run dev`
  <li>
  This will start the application ont eh specified port(default:3000) in development mode.
  <h2>Making API Request with Postman</h2>
  To make API requests to the Shopping Cart API using Postman, follow these steps:
  <li>Open Postman</li>
  <li>Set the HTTP(GET, POST, DELETE, etc.) and enter the API endpoint URL. The available endpoints are defined in the `itemRoutes.js` and `userRoutes.js` files.
  <br>Example endpoints:
  <ul>Get item list: `Get /items`</ul>
  <ul>Get item by ID: `Get /items/:id`</ul>
  <ul>Register a new user: `POST / users/register`</ul>
  <ul>Login a user: `POST /users/login`</ul>
  <ul>Get user profile: `GET /user/profile/:id`</ul>
  <ul>Logout a user: `POST /users/logout</ul>
  <ul>Delete a user: `Delete /users/:id`</ul>
  <ul>Get user's cart by ID: `GET /users/cart/:userid`</ul>
  <ul>Add an item to user's cart: `POST /users/:userid/item/:itemid`
  <ul>Remove an item from user's cart: `DELETE /users/:userid/item/:itemid`
  <li>Set the required header, `Authorization`. The `Authorizaton` header should have the value `Bear <token>`, where `<token>` is the JWT toekn obtained during user authentication.</li>
  <li>Send the request and view the response</li>

  <h2>Running Tests</h2>
  To run the tests for the Shopping Cart API, follow these steps:
  <li> Ensure that the MongoDB service is running on your local machine.</li>
  <li> Run the following command:
  <br> `npm run test`
  <li>This will execute the test scripts defined in the item.js and user.test.js files and display the test results.</li>

  <br>
</ol>
