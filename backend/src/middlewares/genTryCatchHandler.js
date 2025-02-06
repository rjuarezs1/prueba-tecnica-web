import { validationResult } from "express-validator";

export const genTryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    next(error);
  }
};

export const validatorTryCatch = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (error) {
    res.status(403).json({ errors: error.array() });
  }
};
