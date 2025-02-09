import { Sequelize, Model, DataTypes } from "sequelize";
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PWD } from "../config/config";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  logging: false,
  define: {
    charset: "utf8",
    collate: "utf8_spanish_ci",
  },
});

class User extends Model {}

User.init(
  {
    // se definen los atributos del Model Product
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
