import express from "express";

import routes from "./routes/userRoutes.js";

import { Sequelize } from "sequelize";
import config from "./config/database.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());
const sequelize = new Sequelize(config);
User.init(sequelize);

// Routes
app.use("/user", routes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado.");
    app.listen(PORT, () => {
      console.log("Server on");
    });
  })
  .catch((err) => {
    console.error(err);
  });
