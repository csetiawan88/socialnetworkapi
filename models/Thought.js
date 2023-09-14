// Import required modules and dependencies
const { Schema, model, Types } = require("mongoose");

// Define a custom function to reformat dates
function reformat(dateObj) {
  const dateString = dateObj.toISOString();

  // Extract date, hour, and minute from the ISO string
  const date = dateString.split("T")[0];
  const hour = dateString.split("T")[1].split(":")[0];
  const minute = dateString.split("T")[1].split(":")[1];

  // Format and return the date and time
  return `On ${date}, at ${hour}:${minute}`;
}

// Define the schema for Reaction documents
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(), // Generate a default ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, "Text length exceeds 280"], // Limit the maximum text length
    },
    username: {
      type: String,
      required: [true, "Username required"], // Ensure username is required
    },
    createdAt: {
      type: Date,
      default: new Date(), // Set the default date to the current date
      get: (v) => reformat(v), // Use the custom reformat function for date display
    },
  },
  {
    toJSON: { getters: true }, // Enable custom getters when converting to JSON
    id: false, // Disable the generation of id fields
  }
);

// Define the schema for Thought documents
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Text required"], // Ensure text is required
      minlength: [1, "Text required"], // Set a minimum text length
      maxlength: [280, "Text length (exceeds 280 characters"], // Set a maximum text length
    },
    createdAt: {
      type: Date,
      default: new Date(), // Set the default date to the current date
      get: (v) => reformat(v), // Use the custom reformat function for date display
    },
    username: {
      type: String,
      required: [true, "Username required"], // Ensure username is required
    },
    reactions: [reactionSchema], // Embed reaction documents within thoughts
  },
  {
    toJSON: { virtuals: true, getters: true }, // Enable custom getters and virtuals when converting to JSON
    id: false, // Disable the generation of id fields
  }
);

// Define a virtual property to calculate the reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model("thought", thoughtSchema);

// Export the Thought model for use in other parts of the application
module.exports = Thought;
