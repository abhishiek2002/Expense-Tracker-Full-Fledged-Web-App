import { Router } from "express";
import { forgotPassword } from "../Controllers/passwordController.js";

const router = Router();

router.post("/forgotpassword", forgotPassword);

export default router;
