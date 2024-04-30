/** @format */

const asyncHandler = require("../middleware/asyncHandler");
const Image = require("../db/models/image");

/*
    @desc Get images
    @route GET /api/images/
    @access Private
*/
const getImages = asyncHandler(async (req, res) => {
  const images = await Image.find();

  if (!images || images.length === 0) {
    res.status(404);
    throw new Error("No image found");
  }

  res.status(200).json({ images });
});

module.exports = { getImages };
