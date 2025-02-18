import { check } from "express-validator";
import { validatorTryCatch } from "../middlewares/genTryCatchHandler";

export const createUserValidator = [
  check("first_name")
    .exists()
    .withMessage("campo first_name requerido")
    .bail()
    .notEmpty()
    .withMessage("campo first_name no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo string")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("tamaño [3-64] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  check("surname")
    .exists()
    .withMessage("campo surname requerido")
    .bail()
    .notEmpty()
    .withMessage("campo surname no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo string")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("tamaño [3-64] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  check("email")
    .exists()
    .withMessage("campo email requerido")
    .bail()
    .notEmpty()
    .withMessage("campo email no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("campo debe ser un correo electrónico")
    .bail()
    .isLength({ min: 12, max: 128 })
    .withMessage("tamaño [12-128] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  check("password")
    .exists()
    .withMessage("campo password requerido")
    .bail()
    .notEmpty()
    .withMessage("campo password no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo texto")
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage("tamaño [8-255] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  (req, res, next) => {
    validatorTryCatch(req, res, next);
  },
];

export const oneUserValidator = [
  check("email")
    .exists()
    .withMessage("campo email requerido")
    .bail()
    .notEmpty()
    .withMessage("campo email no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("campo debe ser un correo electrónico")
    .bail()
    .isLength({ min: 12, max: 128 })
    .withMessage("tamaño [12-128] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  check("password")
    .exists()
    .withMessage("campo password requerido")
    .bail()
    .notEmpty()
    .withMessage("campo password no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo texto")
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage("tamaño [8-255] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  (req, res, next) => {
    validatorTryCatch(req, res, next);
  },
];

export const logoutUserValidator = [
  check("access_token")
    .exists()
    .withMessage("campo access_token requerido")
    .bail()
    .notEmpty()
    .withMessage("campo access_token no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo string")
    .bail()
    .isLength({ min: 128, max: 256 })
    .withMessage("tamaño [128-256] caracteres permitidos")
    .bail()
    .escape()
    .trim(),
  (req, res, next) => {
    validatorTryCatch(req, res, next);
  },
];
