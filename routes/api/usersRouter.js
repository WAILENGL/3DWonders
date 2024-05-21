const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//user section
router.post("/", userController.createUser);
router.post("/login", userController.userLogin);

router.get("/orders", [ensureLoggedIn], userController.getUserOrdersById);

module.exports = router;
