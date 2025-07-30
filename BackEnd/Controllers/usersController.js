import User from "../Models/UserModel.js";
import createToken from "../Utils/auth.js";
import encryptInstance from "../Utils/encrypt.js";
import sequelize from "../Utils/db-connection.js";
import { QueryTypes } from "sequelize";

async function signupUser(req, res) {
  const { name, email, password, number } = req.body;
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
        number,
        password: encryptPassword,
      });

      const { password, ...safeUser } = user.dataValues;

      res.status(200).json({
        success: true,
        message: "User is signup successfully",
        user: safeUser,
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
      console.log(safeUser);

      const token = createToken(safeUser);

      res.status(200).json({
        success: true,
        message: "Login successfully",
        token,
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

async function verifyUser(req, res) {
  const user = req.user;
  console.log(user);

  if (user) {
    res.status(200).json({
      message: "User is authentcated",
      success: true,
      membership: user.membership,
    });
  }
}

async function topUsers(req, res) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const users = await sequelize.query(
      `
  SELECT 
    u.id,
    u.name,
    SUM(e.amount) AS totalExpenses,
    COUNT(e.id) AS expenseCount
  FROM 
    Users u
  JOIN 
    Expenses e ON u.id = e.userId
  WHERE 
    e.createdAt >= ? AND e.createdAt < ?
  GROUP BY 
    u.id
  ORDER BY 
    totalExpenses DESC
  LIMIT 10
`,
      {
        replacements: [
          startOfMonth.toISOString(),
          endOfMonth.toISOString(),
        ],
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(502).json({
      success: false,
      error: error.message,
    });
  }
}

export { signupUser, loginUser, verifyUser, topUsers };
