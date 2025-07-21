import User from "../Models/UserModel.js";
import encryptInstance from "../Utils/encrypt.js";

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
      // encrypt password
      const encryptPassword = await encryptInstance.encrypt(password);

      const user = await User.create({
        name,
        email,
        password: encryptPassword,
      });
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

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // check if user exists or not
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User doesn't exist",
      });
      return;
    }

    // if user exist , check if password is correct
    const result = await encryptInstance.compare(password, user.password);

    if (result) {
      const { password, ...safeUser } = user.dataValues;

      res.status(200).json({
        success: true,
        message: "Login successfully",
        user: safeUser,
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Either email or password is incorrect",
      });
    }
  } catch (error) {
    res.status(502).json({
      success: false,
      error: error.message,
    });
  }
}

export { signupUser, loginUser };
