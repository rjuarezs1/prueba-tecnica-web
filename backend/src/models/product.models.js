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

class Product extends Model {}

Product.init(
  {
    // se definen los atributos del Model Product
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export default Product;

//PARA PROBAR LA CONEXIÓN DE LA BASE DE DATOS MYSQL CON SEQUELIZE
// si descomento en el archivo app.js la importación:
// import mysql_test_con from "./models/product.models";
// por favor comente arriba desde donde dice:
//class Product extends Model {}
//.
//... hasta
//export default Product;
//luego descomente toda la sentencia que esta abajo, desde:
// const mysql_test_con = async () => {
//.
//... hasta
// export default mysql_test_con;

// const mysql_test_con = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.".green);
//   } catch (error) {
//     console.error("Unable to connect to the database:".red, error);
//   }
// };

// export default mysql_test_con;
