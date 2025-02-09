import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers";
import { oneUserValidator } from "../validators/userValHandler";

const router = Router();

router.post("/signin", oneUserValidator, authControllers.signin);

export default router;
