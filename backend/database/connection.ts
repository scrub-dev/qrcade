import {Sequelize } from "sequelize"
import config_database from "../configs/config_database.js"

export const sequelize = new Sequelize(
  {
    dialect: "sqlite",
    storage: config_database.DATABASE_DIR + "../database/" + config_database.DATABASE_NAME,
    logging: false
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();