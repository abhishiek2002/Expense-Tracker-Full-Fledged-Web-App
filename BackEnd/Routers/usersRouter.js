import { Router } from "express";
import { signupUser, loginUser, verifyUser, topUsers } from "../Controllers/usersController.js";
import verify from "../Middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser)
router.get("/verify",verify, verifyUser);
router.get("/top-users", verify, topUsers);

export default router;
