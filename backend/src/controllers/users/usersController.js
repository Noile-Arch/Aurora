// auth
const usersModel = require("../../models/users/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ message: "Incorrect username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_TOKEN
    );
    res.status(200).json({
      message: "User Logged in successfully!",
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

exports.register = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new usersModel({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while registering user: ${error.message}` });
  }
});

exports.orders = asyncHandler(async (req,res, next)=>{
    try {
        res.status(200).json({
            success: true,
            message: "You can access this page"
        })
    } catch (error) {
        next(error)
    }
});