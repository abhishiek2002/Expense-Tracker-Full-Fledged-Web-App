import { DataTypes } from "sequelize";
import sequelize from "../Utils/db-connection.js";

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Expense;

// ---------------------------------

// export default (sequelize, DataTypes) => {
//   const Expense = sequelize.define("Expense", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     amount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   Expense.associate = (models) => {
//     Expense.belongsTo(models.User);
//   };

//   return Expense;
// };
