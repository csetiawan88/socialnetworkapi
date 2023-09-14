// Import the Express.js framework
const express = require("express");

// Import the database connection setup
const db = require("./config/connection");

// Import the defined routes for the application
const routes = require("./routes");

// Define the port number for the API server
const PORT = 3001;

// Create an instance of the Express.js application
const app = express();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount the defined routes on the Express application
app.use(routes);

// Listen for the "open" event of the database connection
db.once("open", () => {
  // Start the API server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`Open Insomnia: http://localhost:${PORT}/`);
  });
});
