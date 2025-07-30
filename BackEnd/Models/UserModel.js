import { DataTypes } from "sequelize";
import sequelize from "../Utils/db-connection.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  number: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  membership: {
    type: DataTypes.ENUM(["Free", "Premium"]),
    defaultValue: "Free",
  },
});

export default User;
