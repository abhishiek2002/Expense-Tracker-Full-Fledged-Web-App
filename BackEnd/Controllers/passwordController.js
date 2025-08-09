import User from "../Models/UserModel.js";
import { sendForgotPasswordEmail } from "../Services/nodemailer.js";
import { v4 as uuidv4 } from "uuid";
import ForgotPassword from "../Models/ForgotPasswordModel.js";
import encryptInstance from "../Utils/encrypt.js";
import sequelize from "../Utils/db-connection.js";


async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // checking if the user exists and sending a reset link
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique ID for the forgot password request
    const id = uuidv4();

    // Create a new forgot password entry in the database
    await ForgotPassword.create({
      id,
      UserId: user.id,
    });

    // Logic to send reset link to user's email
    const result = await sendForgotPasswordEmail(user.name, email , id);
    console.log("Email sent successfully:", result);

    res
      .status(200)
      .json({
        message: "Password reset link sent to your email.",
        messageId: result,
      });
  } catch (error) {
    // console.error("Error in forgotPassword:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

async function resetPassword(req, res) {
  const id = req.params.id;
  const { newPassword } = req.body;

  try {
  //  check if the forgot password request exists
    const forgotPasswordRequest = await ForgotPassword.findByPk(id);

    // If the request does not exist or is inactive, return an error
    if (!forgotPasswordRequest || !forgotPasswordRequest.isActive) {
      return res.status(404).json({ error: "Invalid or expired reset link" });
    }

    // Generate a transaction fot the reset password process
    // This is optional but can be useful for ensuring data integrity
    const transaction = await sequelize.transaction();

    // Encrypt the new password
    const encryptedPassword = await encryptInstance.encrypt(newPassword);

    // Update the user's password in the database
    const user = await User.findByPk(forgotPasswordRequest.UserId, { transaction });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = encryptedPassword;
    await user.save({transaction});

    // This would typically involve updating the user's password in the database

    // Deactivate the forgot password request after successful reset
    forgotPasswordRequest.isActive = false;
    await forgotPasswordRequest.save({transaction});

    // Commit the transaction
    await transaction.commit();

    res.status(200).json({ message: "Password has been reset successfully." });

  } catch (error) {
    // console.error("Error in forgotPassword:", error.message);
    // Rollback the transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

export { forgotPassword, resetPassword };
