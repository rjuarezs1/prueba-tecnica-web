import { matchedData } from "express-validator";
import { genTryCatch } from "../middlewares/genTryCatchHandler";

export const signup = genTryCatch(async (req, res) => {
  const data = matchedData(req);
  const first_name = data.first_name.toLowerCase();
  const surname = data.surname.toLowerCase();
  const username = first_name.concat("-", surname);
  const email = data.email.toLowerCase();
  const password = data.password;

  const inputs = {
    first_name,
    surname,
    username,
    email,
    password,
  };
  console.dir(inputs);
  res.status(201).json({
    ok: true,
    body: "USER CREATED",
  });
});
