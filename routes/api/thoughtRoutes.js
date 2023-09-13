// Import the Express.js Router module
const router = require("express").Router();

// Import the thought controller methods for handling thought-related routes
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Define the routes and their corresponding controller methods
router
  .route("/")
  .get(getThoughts) // Handle GET requests to retrieve all thoughts
  .post(createThought); // Handle POST requests to create a new thought

router
  .route("/:thoughtId")
  .get(getSingleThought) // Handle GET requests to retrieve a single thought by ID
  .put(updateThought) // Handle PUT requests to update a thought by ID
  .delete(deleteThought); // Handle DELETE requests to delete a thought by ID

router.route("/:thoughtId/reactions").post(addReaction); // Handle POST requests to add a reaction to a thought by ID

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction); // Handle DELETE requests to delete a reaction from a thought by thought ID and reaction ID

// Export the router with defined routes for use in your Express.js application
module.exports = router;
