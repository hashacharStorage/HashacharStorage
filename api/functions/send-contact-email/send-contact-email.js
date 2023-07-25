// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const nodemailer = require("nodemailer");
require('dotenv').config()

const handler = async (event) => {
  try {
    const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
          },
        });
        const mailOptions = {
              from: process.env.EMAIL,
              to: event.emailto,
              subject: `הזמנה ${event.user.firstname} ${event.user.lastname}`,
              text: "Attached is the order PDF",
              attachments: [
                {
                  filename: `${event.user.firstname}_${event.user.lastname}.pdf`,
                  content: event.attachment,
                },
              ],
            };
    // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error occurred while sending email:", error.message);
            } else {
              console.log("Email sent successfully to: " + user.company_email);
            }
          });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `email sent from ${event.user.firstname} ${event.user.lastname}` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
