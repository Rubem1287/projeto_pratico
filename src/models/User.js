import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O nome não pode estar vazio",
            },
            len: {
              args: [1, 255],
              msg: "O nome deve ter entre 1 e 255 caracteres",
            },
          },
        },
        idade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: "A idade deve ser um número inteiro",
            },
            min: {
              args: [1],
              msg: "A idade deve ser maior que 0",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O email não pode estar vazio",
            },
            isEmail: {
              msg: "Digite um email válido.",
            },
          },
        },

        senha: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "A senha não pode estar vazia",
            },
          },
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: "O cpf não pode estar vazio",
            },
          },
        },
        role: {
          type: DataTypes.ENUM("admin", "colaborador"), // tipo do usuário
          defaultValue: "colaborador", // padrão é colaborador
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        freezeTableName: true, // Impede pluralização do nome da tabela
        underscored: false, // Impede conversão camelCase → snake_case
      }
    );
    return this;
  }

  async checkPassword(senha) {
    return bcrypt.compare(senha, this.senha);
  }
}

export default User;
