const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const brevoTransport = require("nodemailer-brevo-transport");
require("dotenv").config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport(
  brevoTransport({
    apiKey: BREVO_API_KEY,
  })
);

app.post("/send-email-by-brevo", async (req, res) => {
  const { senderName, senderEmail, recipientEmail, subject, htmlContent } =
    req.body;

  const mailOptions = {
    from: {
      address: senderEmail,
      name: senderName,
    },
    to: recipientEmail,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email: " + error.message);
  }
});

app.listen(APP_PORT, () => {
  console.log(`Server running at http://localhost:${port}/`);
});