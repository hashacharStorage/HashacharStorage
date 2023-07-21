const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const serverless = require("serverless-http")
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("../router/user");
const companyRouter = require("../router/company");
const authRouter = require("../router/auth");
const teamRouter = require("../router/team");
const productRouter = require("../router/product");
const orderRouter = require("../router/order");
const sanityRouter= require("../router/sanity")

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/.netlify/functions/index",sanityRouter)
app.use("/.netlify/functions/index/auth", authRouter);
app.use("/.netlify/functions/index/users", userRouter);
app.use("/.netlify/functions/index/company", companyRouter);
app.use("/.netlify/functions/index/products", productRouter);
app.use("/.netlify/functions/index/orders", orderRouter);
app.use("/.netlify/functions/index/team", teamRouter);


module.exports.handler = serverless(app);

mongoose
  .connect(process.env.MONGO, { dbName: "storage" })
  // .then(() =>
  //   app.listen(process.env.PORT || 5000, () => {
  //     console.log("server running on port 5000");
  //   })
  // )
  .catch((err) => {
    console.log(err);
  });
