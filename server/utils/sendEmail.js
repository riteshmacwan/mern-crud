const nodemailer = require("nodemailer");

if (process.env.SMTP === "gmail") {
  // Create a transporter using SMTP transport with Gmail settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL,
    },
  });
} else {
  //transporter using mailtrap
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
}

module.exports = transporter;
