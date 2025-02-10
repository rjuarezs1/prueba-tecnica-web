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
      body: "Unprocessable Entity",
    });
  }

  const pwdHashed = userFound.dataValues.password;

  const is_granted = compare_pwd_hashed(password, pwdHashed);

  if (!is_granted) {
    return res.status(401).json({
      ok: false,
      body: "Unauthorized",
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
      body: "Internal Server Error",
    });
  }

  res
    .cookie("jwt", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .header("authorization", access_token)
    .status(200)
    .json({
      ok: true,
      body: access_token,
    });
});
