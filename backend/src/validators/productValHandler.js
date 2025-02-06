import { check, param } from "express-validator";
import { validatorTryCatch } from "../middlewares/genTryCatchHandler";

export const oneProductValidator = [
  param("product_id")
    .exists()
    .withMessage("campo product_id requerido")
    .bail()
    .notEmpty()
    .withMessage("campo product_id no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo string")
    .bail()
    .isLength({ min: 36, max: 36 })
    .withMessage("tamaño [36] caracteres")
    .bail()
    .escape()
    .trim(),
  (req, res, next) => {
    validatorTryCatch(req, res, next);
  },
];

export const createProductValidator = [
  check("name")
    .exists()
    .withMessage("campo name requerido")
    .bail()
    .notEmpty()
    .withMessage("campo name no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo string")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("tamaño [3-64] caracteres")
    .bail()
    .escape()
    .trim(),
  check("description")
    .exists()
    .withMessage("campo description requerido")
    .bail()
    .notEmpty()
    .withMessage("campo description no puede estar vacío")
    .bail()
    .isString()
    .withMessage("campo debe ser de tipo texto")
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage("tamaño [8-255] caracteres")
    .bail()
    .escape()
    .trim(),
  check("price")
    .exists()
    .withMessage("campo price requerido")
    .bail()
    .notEmpty()
    .withMessage("campo price no puede estar vacío")
    .bail()
    .isFloat({ gt: 0.0, lt: 300.0 })
    .withMessage("campo debe ser de tipo numérico flotante [0.0 - 300.0]")
    .bail()
    .custom((value) => {
      const regex = /^-?\d+(\.\d{1,2})?$/;
      if (!regex.test(value)) {
        return Promise.reject("El número debe tener dos decimales como máximo");
      }
      return true;
    })
    .escape()
    .trim(),
  check("stock")
    .exists()
    .withMessage("campo stock requerido")
    .bail()
    .notEmpty()
    .withMessage("campo stock no puede estar vacío")
    .bail()
    .isBoolean()
    .withMessage("campo debe ser de tipo booleano")
    .bail()
    .escape()
    .trim(),
  (req, res, next) => {
    validatorTryCatch(req, res, next);
  },
];
