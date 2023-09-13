const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // Get all thoughts from the database
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({
            message: `No thought with found with Id ${req.params.thoughtId}`,
          });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      if (req.body.username) {
        // Find a user with the provided username
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
          return res
            .status(404)
            .json({
              message: `No user found with username ${req.body.username}`,
            });
        }
      }

      // Create a new thought and associate it with a user
      const thought = await Thought.create(req.body);

      // Update the user's thoughts array
      await User.findOneAndUpdate(
        {
          username: thought.username,
        },
        {
          $addToSet: { thoughts: thought._id },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing thought by its _id
  async updateThought(req, res) {
    try {
      if (req.body.username) {
        // Find a user with the provided username
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
          return res
            .status(404)
            .json({
              message: `No user found with username ${req.body.username}`,
            });
        }
      }

      // Update the thought and return the updated version
      const newThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      res.status(200).json(newThought);
      console.log(`The thought with Id ${req.params.thoughtId} updated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought by its _id
  async deleteThought(req, res) {
    try {
      // Find and delete the thought by its _id
      const result = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      // Remove the thought reference from the user's thoughts array
      await User.findOneAndUpdate(
        {
          username: result.username,
        },
        {
          $pull: { thoughts: req.params.thoughtId },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      res.status(200).json(result);
      console.log(`The thought with Id ${req.params.thoughtId} deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      console.log(`Adding a reaction.`);
      console.log(req.body);

      // Find the thought by its _id and add the reaction
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $addToSet: { reactions: req.body },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found with Id.",
        });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought by reactionId
  async deleteReaction(req, res) {
    try {
      console.log(`Deleting a reaction with Id ${req.params.reactionId}.`);

      // Find the thought by its _id and remove the specified reaction
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found with Id.",
        });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
