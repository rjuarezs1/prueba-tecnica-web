import { matchedData } from "express-validator";
import { genTryCatch } from "../middlewares/genTryCatchHandler";
import User from "../models/user.models";
import { compare_pwd_hashed } from "../utils/encryptHandler";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/config";

export const signin = genTryCatch(async (req, res) => {
  const data = matchedData(req);
  const email = data.email.toLowerCase();
  const password = data.password;

  const userFound = await User.findOne({
    where: { email },
  });

  if (userFound === null) {
    return res.status(422).json({
      ok: false,
      body: null,
      errors: "Entidad no procesable",
    });
  }

  const pwdHashed = userFound.dataValues.password;

  const is_granted = compare_pwd_hashed(password, pwdHashed);

  if (!is_granted) {
    return res.status(401).json({
      ok: false,
      body: null,
      errors: "Sin autorización",
    });
  }

  const access_token = jwt.sign(
    { username: userFound.username },
    ACCESS_TOKEN,
    {
      expiresIn: "1h",
    }
  );

  const refresh_token = jwt.sign(
    { username: userFound.username },
    REFRESH_TOKEN,
    {
      expiresIn: "1d",
    }
  );

  const userUpdated = await User.update(
    { refresh_token },
    {
      where: {
        email,
      },
    }
  );

  if (userUpdated[0] !== 1) {
    return res.status(500).json({
      ok: false,
      body: null,
      errors: "Error interno de servidor",
    });
  }

  res.cookie("jwt", access_token, {
    httpOnly: true, //permite acceso solamente desde peticiones http no desde e.g. windows.cookies
    // sameSite: "None",
    sameSite: "strict", // opción "Lax" obligatoria en producción
    secure: true, // de esta forma es obligatorio en producción
    // maxAge: 24 * 60 * 60 * 1000, // duración 1d
    maxAge: 60 * 60 * 1000, // tiempo en que la cookie permanece del lado del cliente e.g 1h
  });

  res.status(200).json({
    ok: true,
    body: access_token,
  });
});

export const logout = genTryCatch(async (req, res) => {
  const { username } = req.body.decoded;

  await User.update(
    { refresh_token: null },
    {
      where: { username },
    }
  );

  // Limpiar la cookie del lado del cliente
  res.clearCookie("jwt", { path: "/", sameSite: "strict", secure: true });
  res.status(200).json({
    ok: true,
    body: "Logged out exitoso",
  });
});
