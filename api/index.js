const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios")

const userRouter = require("./router/user");
const companyRouter = require("./router/company");
const authRouter = require("./router/auth");
const teamRouter = require("./router/team");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");

dotenv.config();
const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  console.log(req.headers)
  next();
})

app.use(express.json());

//routes
app.get("/", (req, res) => res.send("server alive!"));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/company", companyRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/team", teamRouter);
 

mongoose
  .connect(process.env.MONGO, { dbName: "storage" })
  .then(() => app.listen(process.env.PORT, () => { console.log(`server is listening at port ${process.env.PORT}`) })
  )
  .catch((err) => {
    console.log(err);
  });