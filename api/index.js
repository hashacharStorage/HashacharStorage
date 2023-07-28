const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const serverless = require("serverless-http")
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

const userRouter = require("./router/user");
const companyRouter = require("./router/company");
const authRouter = require("./router/auth");
const teamRouter = require("./router/team");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const sanityRouter = require("./router/sanity");

dotenv.config();
const app = express();

// Enable CORS for all routes
var corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(express.json());


//routes
app.use("/", sanityRouter)
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/company", companyRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/team", teamRouter);

module.exports.handler = serverless(app);

mongoose
  .connect(process.env.MONGO, { dbName: "storage" })
  .catch((err) => {
    console.log(err);
  });