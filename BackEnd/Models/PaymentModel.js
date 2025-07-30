import { DataTypes } from "sequelize";
import sequelize from "../Utils/db-connection.js";

const Payment = sequelize.define("Payment", {
  orderID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  paymentSessionID: {
    type: DataTypes.STRING,
  },
  orderAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderCurrency: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM(["Pending", "Failure", "Success"]),
    defaultValue: "Pending",
  },
});

export default Payment;
