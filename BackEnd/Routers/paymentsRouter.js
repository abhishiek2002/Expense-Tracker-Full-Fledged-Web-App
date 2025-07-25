import { Router } from "express";
import { create, verifyPayment } from "../Controllers/paymentController.js";

const router = Router();

router.post("/order", create);
router.get("/verify/:orderID", verifyPayment);

export default router;
