import { Router } from "express";
import { addExpense, deleteExpense, getExpenses } from "../Controllers/expensesController.js";

const router = Router();

router.get("/", getExpenses);
router.post("/add", addExpense)
router.delete("/remove/:id", deleteExpense)

export default router;
