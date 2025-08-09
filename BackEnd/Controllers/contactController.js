import { sendContactEmail } from "../Services/nodemailer.js";

async function contactMail(req, res) {
  const { name, email, message } = req.body;

  try {
    await sendContactEmail(name, email, message);
    res.status(200).json({
      message: "Message send successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export { contactMail };
