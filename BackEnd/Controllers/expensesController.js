import Expense from "../Models/ExpenseModel.js";

async function addExpense(req, res) {
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.create({ amount, description, category });
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
  try {
    const expenses = await Expense.findAll();
    // console.log(expenses);
    
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
  const id = req.params.id; // id of expense

  try {
    const expense = await Expense.destroy({ where: { id: id } });
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
