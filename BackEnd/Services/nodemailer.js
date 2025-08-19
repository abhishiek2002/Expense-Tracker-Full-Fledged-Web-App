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
          <a href="https://expense-tracker-full-fledged-web-ap.vercel.app/resetPassword.html?id=${id}" class="button">Reset Password</a>
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


const sendContactEmail = async (name, email, message, toEmail = 'kuntalabishek2002@gmail.com') => {

  const htmlContent = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Email</title>
  <style>
    /* Basic reset for email clients */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* Container */
    body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    .email-wrapper { width: 100%; background-color: #f4f6f8; padding: 24px 12px; }
    .email-content { max-width: 620px; margin: 0 auto; }

    /* Card */
    .card { background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e6e9ee; }
    .card-header { padding: 20px 24px; display: flex; align-items: center; gap: 12px; }
    .logo { width: 48px; height: 48px; border-radius: 8px; background-color: #eef2ff; display: inline-flex; align-items: center; justify-content: center; }
    .brand { font-size: 18px; font-weight: 600; color: #0f1724; }
    .subject { font-size: 14px; color: #475569; }

    .card-body { padding: 18px 24px; }
    .intro { font-size: 15px; color: #334155; margin-bottom: 12px; }

    /* Details table */
    .details { width: 100%; border-collapse: collapse; }
    .details td { padding: 8px 0; vertical-align: top; }
    .label { width: 96px; font-weight: 700; color: #0f1724; }
    .value { color: #0f1724; }

    .message-box { margin-top: 14px; padding: 14px; background-color: #f8fafc; border-radius: 8px; border: 1px dashed #e2e8f0; color: #0f1724; white-space: pre-wrap; }

    .footer { padding: 14px 24px; border-top: 1px solid #eef2ff; font-size: 13px; color: #64748b; }

    /* Responsive */
    @media only screen and (max-width: 480px) {
      .brand { font-size: 16px; }
      .label { width: 84px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-content">

      <table role="presentation" width="100%" class="card">
        <tr>
          <td>
            <div class="card-header">
              <!-- Optional logo: replace {{logo_url}} or remove the <img> block -->
              <div class="logo">
                <!-- Inline SVG icon (mail) -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 6.5C2 5.11929 3.11929 4 4.5 4H19.5C20.8807 4 22 5.11929 22 6.5V17.5C22 18.8807 20.8807 20 19.5 20H4.5C3.11929 20 2 18.8807 2 17.5V6.5Z" stroke="#4F46E5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 6.5L12 13L2 6.5" stroke="#4F46E5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              <div>
                <div class="brand">Expense Tracker</div>
                <!-- <div class="subject">Contact Form From ${name}</div> -->
              </div>
            </div>

            <div class="card-body">
              <p class="intro">You have received a new message from your website contact form. Below are the details:</p>

              <table role="presentation" class="details">
                <tr>
                  <td class="label">Name:</td>
                  <td class="value">${name}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${email}">${email}</a></td>
                </tr>
              </table>

              <div class="message-box" role="article" aria-label="Message from visitor">
                ${message}
              </div>

            </div>

            <div class="footer">
              This message was sent from your website contact form. Reply to the visitor using the email address above.
              <br>
              <!-- If you'd like to view more submissions, log into your admin panel at {{site_name}}. -->
            </div>

          </td>
        </tr>
      </table>

    </div>
  </div>
</body>
</html>
`;

  const mailOptions = {
    from: `"Expense Tracker" <${process.env.SENDER_EMAIL}>`,
    to: toEmail, // Placeholder for recipient email
    subject: `Contact Form From ${name}`,
    text: "Click the link below to send reply",
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result.messageId;
  } catch (err) {
    throw new Error(err?.response?.body || err.message );
  }
};

export { sendForgotPasswordEmail, sendContactEmail };
