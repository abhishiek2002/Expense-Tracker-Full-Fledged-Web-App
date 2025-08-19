import express from "express";
import helmet from "helmet";
import "dotenv/config"
import cors from "cors";
import "./Models/index.js";
import usersRouter from "./Routers/usersRouter.js";
import expensesRouter from "./Routers/expensesRouter.js";
import paymentsRouter from "./Routers/paymentsRouter.js";
import verify from "./Middlewares/authMiddleware.js";
import passwordRouter from "./Routers/passwordRouter.js";
import contactRouter from "./Routers/contactRouter.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: "https://expense-tracker-full-fledged-web-ap.vercel.app"}));
app.use(helmet());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.use("/users", usersRouter);
app.use("/expenses", verify, expensesRouter);
app.use("/payments", verify, paymentsRouter)
app.use("/password", passwordRouter);
app.use("/contact", contactRouter)

app.listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
