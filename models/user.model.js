const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
// The code above is a model for a user in a MongoDB database. It uses Mongoose to define the schema and model for the user. The model is then exported to be used in other parts of the application. The code below is an example of how to use the model to create a new user:
