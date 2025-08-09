import { Sequelize } from "sequelize";
import "dotenv/config";
import fs from 'fs';
import mysql2 from 'mysql2';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync("./ca.pem"), // Path to CA certificate
      },
    },
    logging: false, // Disable logging for cleaner output
  }
);

// const sequelize = new Sequelize(process.env.DATABASE_URL);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established");
  } catch (error) {
    console.log("Error while connection to database", error.message);
  }
})();

export default sequelize;
