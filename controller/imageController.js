/** @format */
const fs = require("fs");
const asyncHandler = require("../middleware/asyncHandler");
const { getImageLabels } = require("../logic");
const Image = require("../db/models/image");
const { resolveSoa } = require("dns");
/*
    @desc Upload image
    @route POST /api/image/
    @access Private
*/
const uploadImageAndGetLabels = asyncHandler(async (req, res) => {
  const { file } = req;
  const userId = req.cookies.userId;

  const buffer = fs.readFileSync(file.path);

  const labels = await getImageLabels(buffer);

  const modifiedData = labels.map(
    ({ Name: label, Confidence, BoundingBox }) => ({
      label,
      Confidence,
      BoundingBox,
    })
  );

  const imageData = {
    userId,
    annotations: [...modifiedData],
  };

  const image = await new Image(imageData).save();
  res.status(201).json({ image });
});

/*
    @desc Get all images
    @route GET /api/image/
    @access Private
*/
const getImages = asyncHandler(async (req, res) => {
  const images = await Image.find();

  if (!images || images.length === 0) {
    res.status(400);
    throw new Error("No image found");
  }

  res.status(200).json({ images });
});

/*
    @desc Approve image
    @route POST /api/image/approve
    @access Private /admin
*/
const approveImage = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Please provide id");
  }

  const image = await Image.findById(id);
  if (!id) {
    res.status(400);
    throw new Error("Image not found");
  }

  image.status = "approved";
  await image.save();

  res.status(200).json({ image });
});

/*
    @desc Reject image
    @route POST /api/image/reject
    @access Private /admin
*/
const rejectImage = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Please provide id");
  }

  const image = await Image.findById(id);
  if (!id) {
    res.status(400);
    throw new Error("Image not found");
  }

  image.status = "rejected";
  await image.save();

  res.status(200).json({ image });
});

module.exports = {
  uploadImageAndGetLabels,
  getImages,
  approveImage,
  rejectImage,
};
