import express from "express";
import cors from "cors";
import "./Models/index.js";
import usersRouter from "./Routers/usersRouter.js";
import expensesRouter from "./Routers/expensesRouter.js";

const app = express();
const port = 3000;

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.use("/users", usersRouter);
app.use("/expenses", expensesRouter);

app.listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
