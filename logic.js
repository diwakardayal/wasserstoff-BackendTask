/** @format */
const rekognitionClient = require("./utils/awsRekognitionClient");
const { DetectLabelsCommand } = require("@aws-sdk/client-rekognition");
const fs = require("fs");

async function getImageLabels(imageBytes) {
  try {
    const command = new DetectLabelsCommand({
      Image: { Bytes: imageBytes },
      MaxLabels: 10,
      MinConfidence: 50,
    });

    const response = await rekognitionClient.send(command);

    const labelsWithDetails = response.Labels.map((label) => {
      const labelDetails = {
        Name: label.Name,
        Confidence: label.Confidence.toFixed(2),
      };

      if (label.Instances && label.Instances.length > 0) {
        const instance = label.Instances[0];
        labelDetails.BoundingBox = {
          Left: instance.BoundingBox.Left.toFixed(2),
          Top: instance.BoundingBox.Top.toFixed(2),
          Width: instance.BoundingBox.Width.toFixed(2),
          Height: instance.BoundingBox.Height.toFixed(2),
        };
      } else {
        labelDetails.BoundingBox = null;
      }

      return labelDetails;
    });

    return labelsWithDetails;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

module.exports = { getImageLabels };
