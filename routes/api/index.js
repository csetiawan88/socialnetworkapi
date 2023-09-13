// Import the Express.js Router module
const router = require("express").Router();

// Import the routes for thoughts and users
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// Mount the thought routes under the "/thoughts" path
router.use("/thoughts", thoughtRoutes);

// Mount the user routes under the "/users" path
router.use("/users", userRoutes);

// Export the router for use in your Express.js application
module.exports = router;
