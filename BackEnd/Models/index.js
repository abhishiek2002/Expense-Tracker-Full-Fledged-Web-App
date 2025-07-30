import sequelize from "../Utils/db-connection.js";
import User from "./UserModel.js";
import Expense from "./ExpenseModel.js";
import Payment from "./PaymentModel.js";
// user to expense association

User.hasMany(Expense);
Expense.belongsTo(User);

// user to order association

User.hasMany(Payment);
Payment.belongsTo(User);

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronization is successfull");
  } catch (error) {
    console.log("Error while synchronizing with database", error.message);
  }
})();

export { User, Expense, Payment };
