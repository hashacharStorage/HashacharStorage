const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

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
    </div>
    <div class="body"> 
      <div class="user-details">
        <div><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${user.firstname} ${user.lastname}</div>
        <span>${new Date().toLocaleDateString("en-US")}</span>
        <span>  מחסן:  ${user.warehouse} </span>
        <span>     </span>
        <span>${user.villa ? "צוות וילות   ": "צוות רגיל   "} </span>
        <span>${user.company}</span>
      </div>
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

  // Generate the PDF and save it to a file
  const pdf = await page.pdf();
  fs.writeFileSync("order.pdf", pdf);

  await browser.close();
}

module.exports = generatePDF;
