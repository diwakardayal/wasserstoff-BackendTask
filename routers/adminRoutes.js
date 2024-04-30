/** @format */

const express = require("express");
const { getImages, getData } = require("../controller/adminController");
const { requireAuth, admin } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(requireAuth, admin, getImages);
router.route("/export/:format").get(getData);
module.exports = router;
