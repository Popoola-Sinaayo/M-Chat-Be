const userController = require("../controllers/userController");
const express = require("express");
const auth = require("../middleware/auth");

const route = express.Router();

route.post("/create", userController.createUser);
route.post("/verify", userController.verifyUser);
route.post("/login", userController.loginUser);
route.get("/info", auth.auth, userController.getVerifiedUser);
route.get("/all", auth.auth, userController.fetchAllUsers);

module.exports = route;
