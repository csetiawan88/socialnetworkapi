// Import the database connection setup
const connection = require("../config/connection");

// Import the User and Thought models from the application
const { User, Thought } = require("../models");

// Import functions to generate mock user and thought data
const { getUsers } = require("./userData");
const { getThoughts } = require("./thoughtData");

// Handle errors in the database connection
connection.on("error", (err) => err);

// Once the database connection is open, perform data seeding
connection.once("open", async () => {
  console.log("connected");

  // Delete the collections if they exist
  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();

  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();

  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // Generate mock user data and insert it into the User collection
  const users = getUsers();
  await User.collection.insertMany(users);

  // Generate mock thought data and insert it into the Thought collection
  const thoughts = getThoughts(50);
  await Thought.collection.insertMany(thoughts);

  // Retrieve user IDs from the User collection
  const userIds = (await User.find()).map((user) => user._id);

  // Loop through user IDs to create friendship connections
  for (let i = 0; i < userIds.length; i++) {
    const friendsList = [];

    const username = (await User.findOne({ _id: userIds[i] })).username;

    const thoughtList = (await Thought.find({ username: username })).map(
      (thought) => thought._id
    );

    // Generate random friend connections for each user
    for (let j = 0; j < 3; j++) {
      var randomIndex = Math.floor(Math.random() * userIds.length);
      if (randomIndex !== i) {
        friendsList.push(userIds[randomIndex]);
      }
    }

    // Update the user document with friend and thought connections
    await User.findOneAndUpdate(
      { _id: userIds[i] },
      {
        $addToSet: {
          friends: { $each: friendsList },
          thoughts: { $each: thoughtList },
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
  }

  // Inform that data seeding is complete
  console.info("Seeding completed");

  // Exit the process
  process.exit(0);
});
