import { Router } from "express";
import { signupUser, loginUser, verifyUser } from "../Controllers/usersController.js";
import verify from "../Middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser)
router.get("/verify",verify, verifyUser);

export default router;
