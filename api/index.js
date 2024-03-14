const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require(`${__dirname}/../routes/user.route`);
const authRoutes = require(`${__dirname}/../routes/auth.route`);

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
