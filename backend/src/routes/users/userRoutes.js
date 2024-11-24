const express = require("express");
const userRouter = express.Router();
const { 
  orders, 
  verify, 
  allUsers, 
  updateUser, 
  deleteUser 
} = require("../../controllers/users/usersController");
const { protect, authorize } = require("../../middlewares/authenticate-access-token");

// Protected admin routes
userRouter.use(protect);
userRouter.use(authorize('admin')); 

userRouter.get("/all", allUsers);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
