import { matchedData } from "express-validator";
import { genTryCatch } from "../middlewares/genTryCatchHandler";
import { hash_password } from "../utils/encryptHandler";
import User from "../models/user.models";

export const signup = genTryCatch(async (req, res) => {
  const data = matchedData(req);
  const first_name = data.first_name.toLowerCase();
  const surname = data.surname.toLowerCase();
  const username = first_name.concat("-", surname);
  const email = data.email.toLowerCase();
  const pwd = data.password;

  const password = hash_password(pwd);

  const inputs = {
    first_name,
    surname,
    email,
    username,
    password,
  };

  await User.sync();
  await User.create(inputs);

  res.status(201).json({
    ok: true,
    body: "nuevo usuario creado",
  });
});

export const all_users = genTryCatch(async (req, res) => {
  // se realiza el model querying de sequelize para obtener
  // todos los objetos de la tabla products.
  const usuarios = await User.findAll({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });

  res.status(200).json({
    ok: true,
    body: usuarios,
  });
});
