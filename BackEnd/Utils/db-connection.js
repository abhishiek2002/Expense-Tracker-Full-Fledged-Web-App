import { Sequelize } from "sequelize";

const sequelize = new Sequelize("expense", "root", "Abhishek@2002", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established");
  } catch (error) {
    console.log("Error while connection to database", error.message);
  }
})();

export default sequelize;
