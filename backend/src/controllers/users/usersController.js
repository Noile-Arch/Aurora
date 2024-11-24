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
      return res.status(401).json({ 
        status: 'error',
        message: "Incorrect email or password" 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        status: 'error',
        message: "Incorrect email or password" 
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name || '',
          role: user.role || 'user'
        }
      }
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

exports.verify = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        status: 'error',
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    const user = await usersModel.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ 
        status: 'error',
        message: 'User not found' 
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid token' 
      });
    }
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});