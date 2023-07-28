const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

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
app.post("/generateOrderpdf", (req, res) => {
    console.log(req.body)

})

app.listen(process.env.PORT, () => console.log(`pdfAPI is listening at port ${process.env.PORT}`))