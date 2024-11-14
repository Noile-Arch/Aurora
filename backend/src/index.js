const envFile = `.env.${process.env.NODE_ENV || "development"}`;
require("dotenv").config({ path: envFile });
const errorHandler = require("./middlewares/error-handler");
const db = require("./configs/db.config");
const userRoutes = require("./routes/users/userRoutes");
const productRoutes = require("./routes/products/productRoutes")
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const colors = require("colors/safe");
const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(colors.cyan(`Server listening on port ${PORT}`));
  });
};

db.once("open", () => {
  console.log(colors.bgMagenta("Connected to db"));
  startServer();
});

app.use(errorHandler);

db.once("error", (err) => {
  console.log(colors.red(`Error occurred ${err}`));
  process.exit(1);
});

module.exports = app;
