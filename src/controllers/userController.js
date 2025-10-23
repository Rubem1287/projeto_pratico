import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserService from "../services/userServices.js";

export const createUser = async (req, res) => {
  try {
    const novoUser = await UserService.criarUser(req.body);
    return res.status(201).json(novoUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const user = await UserService.buscarUserPorId(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.buscarTodosUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const userAtualizado = await UserService.atualizarUser(id, req.body);
    return res.status(200).json(userAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const resultado = await UserService.excluirUser(id);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação de campos
    if (!email || !senha) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios",
      });
    }

    // Busca usuário
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    // Verifica senha
    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      return res.status(401).json({
        message: "Senha incorreta",
      });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Retorna sucesso com token e dados do usuário (sem senha)
    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({
      message: "Erro ao realizar login",
    });
  }
};
