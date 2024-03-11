const User = require("./../models/user.model");
const bcryptjs = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "User created" });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error creating user ${error.message}`, error: error });
  }
};
