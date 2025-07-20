import { Router } from "express";
import { signupUser, loginUser } from "../Controllers/usersController.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser)

export default router;
