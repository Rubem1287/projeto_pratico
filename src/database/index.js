import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    define: databaseConfig.define,
  }
);

const initModels = async () => {
  const { default: User } = await import("../models/User.js");

  // Inicializa os models
  User.init(sequelize);

  return { User }; // retorna os models inicializados
};

export { sequelize, initModels };
