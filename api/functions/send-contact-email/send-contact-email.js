// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const nodemailer = require("nodemailer");
require('dotenv').config()

const handler = async (event) => {
  console.log("first im here")
  try {
    console.log(event)
    const subject ='World'
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
              subject: event.subject,
              text: "Attached is the order PDF",
              // attachments: [
              //   {
              //     filename: `${user.firstname}_${user.lastname}.pdf`,
              //     content: pdf,
              //   },
              // ],
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
      body: JSON.stringify({ message: `Hello ${subject}` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

// const generateEmail ()=>{

//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   // Define email options
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: user.company_email,
//     subject: `הזמנה ${user.firstname} ${user.lastname}`,
//     text: "Attached is the order PDF",
//     attachments: [
//       {
//         filename: `${user.firstname}_${user.lastname}.pdf`,
//         content: pdf,
//       },
//     ],
//   };
  
//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error occurred while sending email:", error.message);
//     } else {
//       console.log("Email sent successfully to: " + user.company_email);
//     }
//   });
  
//   await browser.close();
// }