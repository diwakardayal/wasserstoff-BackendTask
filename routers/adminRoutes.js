/** @format */

const express = require("express");
const { getImages } = require("../controller/adminController");

const router = express.Router();

router.route("/").post(getImages);
module.exports = router;
