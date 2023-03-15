const messageController = require("../controllers/messageController");
const express = require("express");
const auth = require("../middleware/auth")

const route = express.Router();

route.post("/create", messageController.createMesage);
route.get("/fetch", auth.auth, messageController.fetchMessage);
route.get("/delete/:id", messageController.deleteMessage);

module.exports = route;
