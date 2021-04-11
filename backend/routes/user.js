const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/signup", UserController.CreateUser);

router.post("/login", UserController.UserLogin);
module.exports = router;
