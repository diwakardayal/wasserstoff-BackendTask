/** @format */

const express = require("express");
const { uploadImage } = require("../middleware/multer");
const {
  uploadImageAndGetLabels,
  getImages,
  approveImage,
  rejectImage,
} = require("../controller/imageController");
const { requireAuth, admin } = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(getImages)
  .post(requireAuth, uploadImage.single("image"), uploadImageAndGetLabels);
router.route("/approve").post(requireAuth, admin, approveImage);
router.route("/reject").post(requireAuth, admin, rejectImage);
module.exports = router;
