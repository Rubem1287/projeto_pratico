import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token não fornecido." });

  try {
    const decodificar_token = jwt.verify(token, process.env.JWT_secret);
    req.user = decodificar_token;
    next();
  } catch {
    res.status(403).json({ mesage: "Token inválido." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado: apenas admin. " });
  }
  next();
};

export default { autenticar, isAdmin };
