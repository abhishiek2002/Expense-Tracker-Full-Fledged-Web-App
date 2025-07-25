import express from "express";
import "dotenv/config"
import cors from "cors";
import "./Models/index.js";
import usersRouter from "./Routers/usersRouter.js";
import expensesRouter from "./Routers/expensesRouter.js";
import paymentsRouter from "./Routers/paymentsRouter.js";
import verify from "./Middlewares/authMiddleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.use("/users", usersRouter);
app.use("/expenses", verify, expensesRouter);
app.use("/payments", verify, paymentsRouter)

app.listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
