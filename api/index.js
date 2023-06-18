const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./router/user");
const companyRouter = require("./router/company");
const authRouter = require("./router/auth");
const teamRouter = require("./router/team");
const productRouter = require("./router/product");
const cartRouter = require("./router/cart");
const orderRouter = require("./router/order");

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/team", teamRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

mongoose
  .connect(process.env.MONGO, { dbName: "storage" })
  .then(() =>
    app.listen(process.env.PORT || 5000, () => {
      console.log("server running on port 5000");
    })
  )
  .catch((err) => {
    console.log(err);
  });
