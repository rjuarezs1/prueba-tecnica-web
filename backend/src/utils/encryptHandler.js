import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const hash_password = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const compare_pwd_hashed = (password, pwdHashed) => {
  return compareSync(password, pwdHashed);
};
