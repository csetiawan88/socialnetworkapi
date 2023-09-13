const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // Get all users from the database
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by their _id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: `No user found with Id ${req.params.userId}` });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing user by their _id
  async updateUser(req, res) {
    try {
      // Get the original username for reference
      const originalUsername = (await User.findOne({ _id: req.params.userId }))
        .username;

      // Update the user and return the updated user
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { runValidators: true, new: true }
      );

      // If the username is updated, update associated thoughts
      if (req.body.username) {
        await Thought.updateMany(
          { username: originalUsername },
          { username: req.body.username }
        );
      }

      res.status(200).json(newUser);
      console.log(`The user with Id ${req.params.userId} updated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by their _id
  async deleteUser(req, res) {
    try {
      // Find and delete the user by their _id
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      var deleteMessage = "";

      // If the user had associated thoughts, delete them
      if (result.username) {
        const thoughtIds = (
          await Thought.find({ username: result.username })
        ).map((thought) => thought._id);

        await Thought.deleteMany({
          username: result.username,
        });

        thoughtIds.forEach((id) => {
          deleteMessage += `The thought with Id ${id}  deleted.\n`;
        });
      }

      res.status(200).json(result);

      console.log(`The user with Id ${req.params.userId} deleted.`);
      console.log(deleteMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friends list
  async addFriend(req, res) {
    try {
      console.log(`Adding a friend with Id ${req.params.friendId}.`);

      // Find the user by their _id and add the friend to their friends list
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: { friends: req.params.friendId },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found with Id.",
        });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend from a user's friends list
  async deleteFriend(req, res) {
    try {
      console.log(`Deleting a friend with Id ${req.params.friendId}.`);

      // Find the user by their _id and remove the friend from their friends list
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: { friends: req.params.friendId },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found with Id.",
        });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
