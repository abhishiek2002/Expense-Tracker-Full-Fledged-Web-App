import { DataTypes } from "sequelize";
import sequelize from "../Utils/db-connection.js";

const Order = sequelize.define("Order", {
  orderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

export default Order;
