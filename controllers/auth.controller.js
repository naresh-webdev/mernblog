const User = require("./../models/user.model");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("./../utils/error.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
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
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password"));
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );

    const { password: pass, ...userInfo } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({ userInfo });
  } catch (error) {
    next(error);
  }
};

exports.google = async (req, res, next) => {
  const { name, email, photoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      const { password: pass, ...userInfo } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json({ userInfo });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      const { password: pass, ...userInfo } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json({ userInfo });
    }
  } catch (error) {
    next(error);
  }
};
