/** @format */
const { stringify } = require("csv-stringify");
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

const getData = asyncHandler(async (req, res) => {
  const { format } = req.params;

  const images = await Image.find().lean();

  if (!images || images.length === 0) {
    res.status(404);
    throw new Error("No image found");
  }

  const csvData = images.map((image) => ({
    _id: image._id,
    imageId: image.imageId,
    userId: image.userId,
    status: image.status,
    annotations: image.annotations.map((annotation) => ({
      label: annotation.label,
      confidence: annotation.confidence,
      boundingBox: annotation.boundingBox,
    })),
  }));

  if (format === "csv") {
    stringify(csvData, { header: true }, (err, csvString) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      res.header("Content-Type", "text/csv");
      res.attachment("export.csv");

      res.send(csvString);
    });
  } else if (format === "json") {
    res.json(csvData);
  }
});

module.exports = { getImages, getData };
