import { Router } from "express";
import * as userControllers from "../controllers/user.controllers";
import { createUserValidator } from "../validators/userValHandler";

const router = Router();

router.post("/signup", createUserValidator, userControllers.signup);

export default router;
