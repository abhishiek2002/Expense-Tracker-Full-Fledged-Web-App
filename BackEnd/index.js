import express from "express";
import cors from "cors";
import "./Models/index.js";
import usersRouter from "./Routers/usersRouter.js";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
