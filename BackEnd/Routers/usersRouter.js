import { Router } from "express";
import { signupUser } from "../Controllers/usersController.js";

const router = Router();

router.post("/signup", signupUser);

export default router;
