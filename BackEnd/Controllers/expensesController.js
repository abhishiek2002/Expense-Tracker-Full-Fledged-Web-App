import Expense from "../Models/ExpenseModel.js";

async function addExpense(req, res) {
  const { amount, description, category } = req.body;
  const user = req.user;

  try {
    const expense = await Expense.create({
      amount,
      description,
      category,
      UserId: user.id,
    });
    res.status(200).json({
      success: true,
      message: "Expense has been recorded",
      expense,
    });
  } catch (error) {
    res.status(502).json({
      error: error.message,
    });
  }
}

async function getExpenses(req, res) {
  const user = req.user;
  try {
    const expenses = await Expense.findAll({ where: { UserId: user.id } });

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
