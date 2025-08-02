import { DataTypes } from "sequelize";
import sequelize from "../Utils/db-connection.js";

const ForgotPassword = sequelize.define("ForgotPassword", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default ForgotPassword;
