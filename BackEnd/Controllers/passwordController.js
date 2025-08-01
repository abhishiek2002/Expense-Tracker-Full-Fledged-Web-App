import User from "../Models/userModel.js";
import { sendForgotPasswordEmail } from "../Services/nodemailer.js";

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // checking if the user exists and sending a reset link
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Logic to send reset link to user's email
    // Logic to handle forgot password
    const result = await sendForgotPasswordEmail(email);
    console.log("Email sent successfully:", result);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email.", messageId: result });
  } catch (error) {
    // console.error("Error in forgotPassword:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

export { forgotPassword };
