const express = require("express");
const userRouter = express.Router();
const { orders, verify } = require("../../controllers/users/usersController");
const authenticateAccessToken = require("../../middlewares/authenticate-access-token");

userRouter.get("/verify", authenticateAccessToken, verify);
userRouter.get("/orders", authenticateAccessToken, orders);

module.exports = userRouter;
