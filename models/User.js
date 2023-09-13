// Import required modules and dependencies from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for User documents
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"], // Ensure username is required
      unique: [true, "This username is already existed."], // Ensure username uniqueness
      trim: true, // Trim any leading or trailing white spaces
    },
    email: {
      type: String,
      trim: true, // Trim any leading or trailing white spaces
      lowercase: true, // Convert email to lowercase
      validate: {
        validator: function (v) {
          // Define a regular expression for email validation
          const emailRegex = new RegExp(
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
          );
          return emailRegex.test(v); // Validate email format using the regular expression
        },
        message: (props) => `${props.value} is not a valid email address`, // Custom error message for invalid email format
      },
      required: [true, "Please enter Email"], // Ensure email is required
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought", // Reference the "thought" model for the thoughts array
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user", // Reference the "user" model for the friends array
      },
    ],
  },
  {
    toJSON: { virtuals: true }, // Enable virtual properties when converting to JSON
    id: false, // Disable the generation of id fields
  }
);

// Define a virtual property to calculate the friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model("user", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
