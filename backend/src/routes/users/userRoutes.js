const express = require("express");
const userRouter = express.Router();
const {
  login,
  register,
  orders,
} = require("../../controllers/users/usersController");
const authenticateAccessToken = require("../../middlewares/authenticate-access-token");

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/orders", authenticateAccessToken, orders);

module.exports = userRouter;
