const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const serverless = require("serverless-http")
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

const userRouter = require("../router/user");
const companyRouter = require("../router/company");
const authRouter = require("../router/auth");
const teamRouter = require("../router/team");
const productRouter = require("../router/product");
const orderRouter = require("../router/order");
const sanityRouter = require("../router/sanity")

dotenv.config();
const app = express();

// Enable CORS for all routes
var corsOptions = {
  origin: ["https://hashacharstorage.netlify.app","https://64bc3718c252e02581126f0d--hashacharstorage.netlify.app","http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

//routes
app.use("/.netlify/functions/index", sanityRouter)
app.use("/.netlify/functions/index/auth", authRouter);
app.use("/.netlify/functions/index/users", userRouter);
app.use("/.netlify/functions/index/company", companyRouter);
app.use("/.netlify/functions/index/products", productRouter);
app.use("/.netlify/functions/index/orders", orderRouter);
app.use("/.netlify/functions/index/team", teamRouter);

module.exports.handler = serverless(app);

mongoose
  .connect(process.env.MONGO, { dbName: "storage" })
  .catch((err) => {
    console.log(err);
  });
