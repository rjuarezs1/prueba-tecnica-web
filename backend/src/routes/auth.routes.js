import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/verifyCookiesHandler";
import { validateAccessToken } from "../middlewares/validateTokenHandler";
import {
  oneUserValidator,
  logoutUserValidator,
} from "../validators/userValHandler";

const router = Router();

router.post("/signin", oneUserValidator, authControllers.signin);
// router.post("/logout", logoutUserValidator, authControllers.logout);
router.post(
  "/logout",
  verifyToken,
  validateAccessToken,
  authControllers.logout
);

export default router;
