import { Router } from "express";
import { forgotPassword, resetPassword } from "../Controllers/passwordController.js";

const router = Router();

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:id", resetPassword);

export default router;
