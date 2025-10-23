import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
} from "../controllers/userController.js";

import { autenticar, isAdmin } from "../middleware/auth.js";

const routes = express.Router();

routes.get("/users", getAllUsers);
routes.delete("/:id", deleteUser);

routes.post("/cadastrar", createUser);
routes.post("/login", login);

routes.put("/:id", updateUser);
routes.get("/:id", getUserById);

export default routes;
