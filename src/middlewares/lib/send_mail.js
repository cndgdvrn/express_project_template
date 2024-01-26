const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter
    .sendMail(options)
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });

};


module.exports = sendEmail;
