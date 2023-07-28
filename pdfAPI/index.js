const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const { generatePDF } = require("./utils/pdfGenerator");
dotenv.config();
const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

app.use(express.json());

//routes
app.post("/generateOrderpdf", async (req, res) => {
    try {
        const user = req.body.user;
        const order = req.body.order;
        const pdf = await generatePDF(order, user);
        console.log("after pdf")
        res.setHeader("Content-Type", "application/pdf");
        res.send( {pdf:pdf.toString("base64")} )

    } catch {
        (err) => {
            console.error(err);
            res.status(500).send(err);
        }
    }
})

app.listen(process.env.PORT, () => console.log(`pdfAPI is listening at port ${process.env.PORT}`))