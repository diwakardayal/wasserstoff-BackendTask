/** @format */

const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../db/models/user");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// @desc Create user
// @route POST /api/user/
// @access Public
const createUser = asyncHandler(async (req, res) => {
  const { userId, password, email } = req.body;

  if (!userId || !password || !email) {
    res.status(400);
    throw new Error("Please enter userId/password/email");
  }

  try {
    const newUser = new User({
      userId,
      password,
      email,
    });

    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (e) {
    console.log(e);
    res.status(500);
    throw new Error("Failed to create user");
  }
});

// @desc Auth user
// @route POST /api/user/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });
  if (user && (await user.matchPassword(password))) {
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie("userId", user._id);

    res.status(200).json({
      _id: user._id,
      userId: user.userId,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid userId or password");
  }
});

module.exports = { createUser, authUser };
