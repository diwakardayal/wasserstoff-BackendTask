/** @format */

const express = require("express");
const router = express.Router();
const { createUser, authUser } = require("../controller/userController");

router.route("/").post(createUser);
router.route("/auth").post(authUser);

module.exports = router;
