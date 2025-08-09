import sequelize from "../Utils/db-connection.js";
import User from "./UserModel.js";
import Expense from "./ExpenseModel.js";
import Payment from "./PaymentModel.js";
import ForgotPassword from "./ForgotPasswordModel.js";

// user to expense association

User.hasMany(Expense);
Expense.belongsTo(User);

// user to order association

User.hasMany(Payment);
Payment.belongsTo(User);

// user to forgot password association

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronization is successfull");
  } catch (error) {
    console.log("Error while synchronizing with database", error.message);
  }
})();

export { User, Expense, Payment };

// import fs from "fs";
// import path from "path";
// import { Sequelize, DataTypes } from "sequelize";
// import { fileURLToPath } from "url";
// import { pathToFileURL } from "url";

// // import configRaw from '../config/config.json' assert { type: 'json' };

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const configRaw = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "../config/config.json"), "utf8")
// );
// const config = configRaw[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// // Dynamically import all model files and register them
// const modelFiles = fs
//   .readdirSync(__dirname)
//   .filter((file) => file !== basename && file.endsWith(".js"));

// for (const file of modelFiles) {
//   // const { default: modelDefiner } = await import(path.join(__dirname, file));
//   const filePath = pathToFileURL(path.join(__dirname, file));
//   const { default: modelDefiner } = await import(filePath.href);

//   const model = modelDefiner(sequelize, DataTypes);
//   db[model.name] = model;
// }

// // Setup associations
// Object.keys(db).forEach((modelName) => {
//   if (typeof db[modelName].associate === "function") {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
