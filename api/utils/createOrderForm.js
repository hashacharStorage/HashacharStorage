const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateOrderPDF(orders, user) {
    const doc = new PDFDocument();

    doc.registerFont('Rubik', './Rubik-VariableFont_wght.ttf');
    console.log("first")

    doc.pipe(fs.createWriteStream('orders.pdf'));

    // User Details
    const userDetails = `${user.firstname} ${user.lastname}\nWarehouse: ${user.warehouse}\n${user.company}`;

    doc.font('Rubik').fontSize(14).text(userDetails, { align: 'right' });
    console.log("second")
    doc.moveDown();

    doc.font('Courier').fontSize(20).text('ORDER', { align: 'center' });

    doc.moveDown();

    doc.font('Courier').fontSize(16).text('מוצרים שחורים', { align: 'left' });

    orders
        .filter(order => order.isBlack)
        .forEach(order => {
            doc.moveDown();
            doc.font('Courier').fontSize(12).text(`${order.serial} | ${order.title} X ${order.quantity}`);
        });

    doc.moveDown();

    doc.font('Courier').fontSize(16).text('מוצרים בעלי מספר סידורי', { align: 'left' });

    orders
        .filter(order => !order.isBlack)
        .forEach(order => {
            doc.moveDown();
            doc.font('Courier').fontSize(12).text(`${order.serial} | ${order.title} X ${order.quantity}`);
        });

    // Current Date
    const currentDate = new Date().toLocaleDateString();

    doc.moveDown();

    doc.font('Courier').fontSize(12).text(`תאריך: ${currentDate}`, { align: 'right' });

    doc.end();
}

module.exports = generateOrderPDF;
