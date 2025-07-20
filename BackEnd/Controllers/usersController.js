import User from "../Models/UserModel.js";
import sequelize from "../Utils/db-connection.js";

async function signupUser(req, res) {
  const { name, email, password } = req.body;
  try {
    // check if user already exists or not
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.status(400).json({
        success: false,
        error: "Email is already exists",
      });
    } else {
      const user = await User.create({ name, email, password });
      res.status(200).json({
        success: true,
        message: "User is signup successfully",
        user,
      });
    }
  } catch (error) {
    res.status(502).json({
      error: error.message,
    });
  }
}

export { signupUser };
