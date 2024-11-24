// auth
const usersModel = require("../../models/users/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




exports.allUsers = asyncHandler(async (req, res) => {
  try {
    // Get query parameters for filtering and pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    // Build query
    const query = {};
    
    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Add role filter
    if (role) {
      query.role = role;
    }

    // Add status filter
    if (status) {
      query.status = status;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await usersModel.countDocuments(query);

    // Fetch users
    const users = await usersModel
      .find(query)
      .select('-password') // Exclude password
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      status: 'success',
      data: {
        users,
        pagination: {
          total,
          page,
          totalPages,
          hasNextPage,
          hasPrevPage
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Add user update functionality
exports.updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    // Check if user exists
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update user
    const updatedUser = await usersModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        status,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Add user delete functionality
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Admin users cannot be deleted'
      });
    }

    // Delete user
    await usersModel.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});