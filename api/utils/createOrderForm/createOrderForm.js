const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const fs = require("fs");
const path = require("path");
dotenv.config();

async function generatePDF(order, user) {
  const blackProducts = order.filter((product) => product.isBlack);
  const serializedProducts = order.filter((product) => !product.isBlack);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const imagePath = path.join(__dirname, "logo.png");
  const imageData = fs.readFileSync(imagePath, 'base64'); // Read image file as base64 data

  // Generate the black products table
  const blackProductsTableHtml = await page.evaluate((products) => {
    const tableRows = products.map((product) => {
      return `<tr>
        <td>${product.quantity}</td>
        <td>${product.title}</td>
        <td>${product.serial}</td>
      </tr>`;
    });

    return `<table class="product-table">
    <thead>
    <tr>
      <th>כמות</th>
      <th>פריט</th>
      <th>מק"ט</th>
    </tr>
  </thead>
      <tbody>${tableRows.join("")}</tbody>
    </table>`;
  }, blackProducts);

  // Generate the serialized products table
  const serializedProductsTableHtml = await page.evaluate((products) => {
    const tableRows = products.map((product) => {
      return `<tr>
        <td>${product.quantity}</td>
        <td>${product.title}</td>
        <td>${product.serial}</td>
      </tr>`;
    });

    return `<table class="product-table">
      <thead>
        <tr>
          <th>כמות</th>
          <th>פריט</th>
          <th>מק"ט</th>
        </tr>
      </thead>
      <tbody>${tableRows.join("")}</tbody>
    </table>`;
  }, serializedProducts);

  // Set the content to the tables
  await page.setContent(`
    <div class="header">
        <img src="data:image/png;base64,${imageData}" alt="Header Image" />
        <div class="user-details">
          <div><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${user.firstname} ${user.lastname}</div>
            <span>${new Date().toLocaleDateString("en-US")}</span>
            <span>  מחסן:  ${user.warehouse} </span>
            <span>     </span>
            <span>${user.villa ? "צוות וילות   " : "צוות רגיל   "} </span>
            <span>${user.company}</span>
          </div>
        </div>
        <div class="body"> 
    <div class="products">
      <div>
        <h2>ציוד שחור</h2>
        ${blackProductsTableHtml}
      </div>
      <div>
        <h2>ציוד סיראלי</h2>
        ${serializedProductsTableHtml}
      </div>
      </div>
      ${user.team === 2 ? '<div class="additional-section">להדפיס פעמיים</div>' : ''}
    </div>
    </div>
  </div>
  `);

  // Add CSS file to the page
  const cssPath = path.join(__dirname, "createOrderForm.css");
  const css = fs.readFileSync(cssPath, "utf8");
  await page.addStyleTag({ content: css });

  // Generate the PDF
  const pdf = await page.pdf();
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: "liram100@gmail.com",
    to: "machsan@hashahart.co.il",
    subject: `הזמנה ${user.firstname} ${user.lastname}`,
    text: "Attached is the order PDF",
    attachments: [
      {
        filename: `${user.firstname}_${user.lastname}.pdf`,
        content: pdf,
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred while sending email:", error.message);
    } else {
      console.log("Email sent successfully!");
    }
  });

  await browser.close();
}

module.exports = generatePDF;
