import { Router } from "express";
import * as userControllers from "../controllers/user.controllers";
import { createUserValidator } from "../validators/userValHandler";

const router = Router();

router.get("/users", userControllers.all_users);
router.post("/signup", createUserValidator, userControllers.signup);

export default router;
