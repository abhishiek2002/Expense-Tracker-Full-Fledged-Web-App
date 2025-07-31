import Expense from "../Models/ExpenseModel.js";
import User from "../Models/UserModel.js";
import sequelize from "../Utils/db-connection.js";

async function addExpense(req, res) {
  const { title, amount, description, category } = req.body;
  const user = req.user;
  if (!title || !amount || !category) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields: title, amount, category",
    });
  }

  const transaction = await sequelize.transaction();

  try {
    // update the expense table with the new expense
    const expense = await Expense.create({
      title,
      amount,
      description,
      category,
      UserId: user.id,
    }, { transaction });

    // update the user table with the new expense
    await User.increment(
      {
        totalExpense: amount,
        expenseCount: 1, // Increment monthly expense count
      },
      {
        where: { id: user.id },
        transaction
      }
    );

    transaction.commit();

    res.status(201).json({
      success: true,
      message: "Expense has been recorded",
      expense,
    });

  } catch (error) {
    transaction.rollback();
    console.error("Error while adding expense:", error);
    res.status(502).json({
      error: error.message,
    });
  }
}

async function getExpenses(req, res) {
  const user = req.user;
  try {
    const expenses = await Expense.findAll({
      where: { UserId: user.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: `${expenses.length} expenses has been fetched successfully`,
      expenses,
    });
  } catch (error) {
    res.status(502).json({
      error: error.message,
    });
  }
}

async function deleteExpense(req, res) {
  const user = req.user;
  const id = req.params.id; // id of expense

  try {
    const expense = await Expense.destroy({
      where: { id: id, UserId: user.id },
    });
    res.status(200).json({
      success: true,
      message: "Expense has been deleted successfully",
    });
  } catch (error) {
    res.status(502).json({
      error: error.message,
    });
  }
}

export { addExpense, getExpenses, deleteExpense };
