const client = require('@sendgrid/mail');
require('dotenv').config()

exports.handler = async function (event, context, callback) {
  // console.log(event)
  client.setApiKey(process.env.SENDGRID_API_KEY);
  const data = {
    to: 'machsan@hashahart.co.il',
    from: 'niv@hashahart.co.il',
    subject: 'process.env.EMAIL',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // attachments: [
    //   {
    //     content: attachment,
    //     filename: "attachment.pdf",
    //     type: "application/pdf",
    //     disposition: "attachment"
    //   }
    // ] 
    // https://www.twilio.com/blog/sending-email-attachments-with-sendgrid
  };

  try {
    await client.send(data);
    return {
      statusCode: 200,
      body: 'Message sent',
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
