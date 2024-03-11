const express = require("express");

const userController = require(`${__dirname}/../controllers/user.controller`);

const router = express.Router();

router.get("/test", userController.test);

module.exports = router;
