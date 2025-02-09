import { genTryCatch } from "../middlewares/genTryCatchHandler";
import { matchedData } from "express-validator";
import Product from "../models/product.models";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/config";

export const all_products = genTryCatch(async (req, res) => {
  // se realiza el model querying de sequelize para obtener
  // todos los objetos de la tabla products.
  const productos = await Product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  res.status(200).json({
    ok: true,
    body: productos,
  });
});

export const create_product = genTryCatch(async (req, res) => {
  //recuperamos el cuerpo de la petición http mediante express-validator.
  const data = matchedData(req);
  const name = data.name.toLowerCase();
  //se recuperan los valores del cuerpo de manera individual, aunque también se puede hacer
  //la desestructuración del objeto, en este caso se hizo de la siguiente manera:
  const description = data.description.toLowerCase();
  const price = parseFloat(data.price);
  const stock = data.stock.toLowerCase() === "true";

  const inputs = {
    name,
    description,
    price,
    stock,
  };

  // para este endpoint primero se utiliza la sincronización hacia la base de datos
  // que evalua si la tabla products no existe se crea de lo contrario no hace nada más.
  await Product.sync();
  // se realiza el model querying de sequelize para crear un objeto en la table products.
  await Product.create(inputs);

  res.status(201).json({
    ok: true,
    msg: "PRODUCTO CREADO",
  });
});

export const one_product = genTryCatch(async (req, res) => {
  // recuperamos el param de la petición http mediante express-validator,
  // en este caso por ejemplo con una desestructuración previa del objeto.
  const { product_id } = matchedData(req);
  const id = product_id.toLowerCase();

  const producto = await Product.findOne({
    where: { product_id: id },
  });

  if (producto === null) {
    return res.status(403).json({
      ok: false,
      body: producto,
    });
  }

  res.status(200).json({
    ok: true,
    body: producto,
  });
});

export const update_product = genTryCatch(async (req, res) => {
  const data = matchedData(req);
  const product_id = data.product_id;
  const name = data.name.toLowerCase();
  const description = data.description.toLowerCase();
  const price = parseFloat(data.price);
  const stock = data.stock.toLowerCase() === "true";

  const inputs = {
    name,
    description,
    price,
    stock,
  };

  const [producto_actualizado] = await Product.update(inputs, {
    where: { product_id },
  });

  if (producto_actualizado === 0) {
    return res.status(403).json({
      ok: false,
      body: `${producto_actualizado} productos actualizados`,
    });
  }

  res.status(200).json({
    ok: true,
    body: `${producto_actualizado} productos actualizados`,
  });
});

export const delete_product = genTryCatch(async (req, res) => {
  const { product_id } = matchedData(req);
  const id = product_id.toLowerCase();

  const producto_eliminado = await Product.destroy({
    where: { product_id: id },
  });

  if (producto_eliminado === 0) {
    return res.status(403).json({
      ok: false,
      body: `${producto_eliminado} productos eliminados`,
    });
  }

  res.sendStatus(204);
});
