// Import the Express.js Router module
const router = require("express").Router();

// Import the user controller methods for handling user-related routes
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Define the routes and their corresponding controller methods for user operations

// Route for handling GET (retrieve all users) and POST (create a new user) requests
router
  .route("/")
  .get(getUsers) // Handle GET requests to retrieve all users
  .post(createUser); // Handle POST requests to create a new user

// Route for handling GET (retrieve a single user by ID), PUT (update a user by ID), and DELETE (delete a user by ID) requests
router
  .route("/:userId")
  .get(getSingleUser) // Handle GET requests to retrieve a single user by ID
  .put(updateUser) // Handle PUT requests to update a user by ID
  .delete(deleteUser); // Handle DELETE requests to delete a user by ID

// Route for handling POST (add a friend to a user by user ID and friend ID) and DELETE (remove a friend from a user by user ID and friend ID) requests
router
  .route("/:userId/friends/:friendId")
  .post(addFriend) // Handle POST requests to add a friend to a user by user ID and friend ID
  .delete(deleteFriend); // Handle DELETE requests to remove a friend from a user by user ID and friend ID

// Export the router with defined routes for use in your Express.js application
module.exports = router;
