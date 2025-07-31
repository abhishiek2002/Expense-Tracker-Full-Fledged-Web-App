import { Sequelize } from "sequelize";
import "dotenv/config"

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging for cleaner output
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
