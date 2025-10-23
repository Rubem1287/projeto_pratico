import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class UserService {
  static async validadeIdUser(id) {
    const idNumerico = parseInt(id, 10);

    if (isNaN(idNumerico) || idNumerico <= 0) {
      throw new Error("ID inválido");
    }

    const user = await UserService.buscarUserPorId(idNumerico);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  static async criarUser({ nome, idade, email, senha, cpf, role }) {
    try {
      // Hash da senha antes de salvar
      const senhaHash = await bcrypt.hash(senha, 10);

      const user = await User.create({
        nome,
        idade,
        email,
        senha: senhaHash,
        cpf,
        role: role || "colaborador",
      });

      return user;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }

  static async buscarUserPorId(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }

  static async buscarTodosUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  static async atualizarUser(id, { nome, idade, email, senha, cpf, role }) {
    try {
      const user = await UserService.validadeIdUser(id);

      const dadosAtualizacao = {
        nome: nome ?? user.nome,
        idade: idade !== undefined ? parseInt(idade, 10) : user.idade,
        email: email ?? user.email,
        cpf: cpf ?? user.cpf,
        role: role ?? user.role,
      };

      // Hash da senha se foi fornecida
      if (senha) {
        dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
      } else {
        dadosAtualizacao.senha = user.senha;
      }

      // Atualiza
      await user.update(dadosAtualizacao);

      return user;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  static async excluirUser(id) {
    try {
      await UserService.validadeIdUser(id);

      await User.destroy({
        where: { id },
      });

      return { message: "Usuário excluído com sucesso" };
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  }
}
