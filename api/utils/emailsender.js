require('dotenv').config();
const nodemailer = require("nodemailer");

const sendEmail = async (pdf, user) => {

  console.log(process.env.EMAIL_PASS);
  console.log(process.env.EMAIL);
  console.log(user);
  console.log(pdf);

  const binaryPDF = Buffer.from(pdf, 'base64');

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: [user.company_email, user.email],
    subject: `הזמנה ${user.firstname} ${user.lastname}`,
    text: "Attached is the order PDF",
    attachments: [
      {
        filename: `${user.firstname}_${user.lastname}.pdf`,
        content: binaryPDF,
      },
    ],
  };

  console.log(process.env.EMAIL_PASS);
  console.log(process.env.EMAIL);
  console.log(mailOptions)

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred while sending email:", error.message);
    } else {
      console.log("Email sent successfully!");
    }
  });

  return;

}

module.exports = { sendEmail }