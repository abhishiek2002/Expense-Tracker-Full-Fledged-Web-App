import nodemailer from "nodemailer";
import "dotenv/config";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kuntalabishek2002@gmail.com",
    pass: process.env.APP_PASSWORD, // see below
  },
});

const htmlContent = `
  <h1>Reset Your Password</h1>
  <p>Click the link below to reset your password:</p>
  <a href=" http://localhost:5173/resetPassword.html">Reset Password</a>
  <p>If you did not request this, please ignore this email.</p>
`;


const sendForgotPasswordEmail = async (toEmail) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
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
