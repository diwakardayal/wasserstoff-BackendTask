/** @format */

const express = require("express");
const adminRouter = require("./adminRoutes");
const userRouter = require("./userRoutes");
const imageRouter = require("./imageRoutes");

const router = express.Router();

router.use("/api/admin", adminRouter);
router.use("/api/user", userRouter);
router.use("/api/image", imageRouter);

module.exports = router;
