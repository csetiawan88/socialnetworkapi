// Connecting to a MongoDB database using Mongoose

const { connect, connection } = require("mongoose");

// Define the MongoDB connection string. If not provided, it defaults to a local database.
const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkAPI";

// Connect to the MongoDB database using Mongoose with specified options.
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the Mongoose connection object to be used elsewhere in the application.
module.exports = connection;
