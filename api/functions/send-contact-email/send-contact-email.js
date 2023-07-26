const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const client = require('@sendgrid/mail');
require('dotenv').config();

exports.handler = async function (event, context, callback) {
  console.log(event)
  const { user, order } = JSON.parse(event.body);
  client.setApiKey(process.env.SENDGRID_API_KEY);
  return generatePDF(order, user);

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
        ${user.team === 1 ? '<div class="additional-section">להדפיס פעמיים</div>' : ''}
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
    await browser.close();

    const data = {
      to: user.company_email,
      from: process.env.EMAIL,
      subject: `הזמנה ${user.firstname} ${user.lastname}`,
      html: '<strong>מצורף טופס הזמנה</strong>',
      attachments: [
        {
          content: pdf.toString("base64"),
          filename: `${user.firstname}_${user.lastname}.pdf`,
          type: "application/pdf",
          disposition: "attachment"
        }
      ]
    };
    try {
      await client.send(data);
      return {
        statusCode: 200,
        body: 'Message sent',
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message }),
      };
    }
  }
}

