const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  console.log("Request  not gonna work :", req.originalUrl);
  res.send("Hello!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
