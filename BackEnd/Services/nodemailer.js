import nodemailer from "nodemailer";
import "dotenv/config";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD, // see below
  },
});




const sendForgotPasswordEmail = async (name, toEmail, id) => {

  const htmlContent = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        width: 90%;
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #333333;
      }
      .content {
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 24px;
        background-color: #007BFF;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        font-size: 12px;
        color: #999999;
        text-align: center;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <p style="text-align: center;">
          <a href="http://localhost:5173/resetPassword.html?id=${id}" class="button">Reset Password</a>
        </p>
        <p>If you did not request this, please ignore this email. This link will expire in 30 minutes for your security.</p>
        <p>Thanks,<br>Your Company Name</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"Expense Tracker" <${process.env.SENDER_EMAIL}>`,
    to: toEmail, // Placeholder for recipient email
    subject: "Password Reset Request",
    text: "Click the link below to reset your password:\n\n[Reset Link]",
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result.messageId;
  } catch (err) {
    throw new Error(err?.response?.body || err.message );
  }
};

export { sendForgotPasswordEmail };
