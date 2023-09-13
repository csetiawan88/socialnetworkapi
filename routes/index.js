// Import the Express.js Router module
const router = require("express").Router();

// Import the API routes from the "api" module
const apiRoutes = require("./api");

// Mount the API routes under the "/api" path
router.use("/api", apiRoutes);

// Define a catch-all route for requests to routes that do not exist
router.use((req, res) => res.send("Wrong route!"));

// Export the router for use in your Express.js application
module.exports = router;
