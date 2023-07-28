const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
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
app.use(cors());

// Enable CORS for all routes
var corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

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