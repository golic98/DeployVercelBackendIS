import express from "express";
import 'dotenv/config';
import mainRouter from "./src/routes/route.main.js";
import { connectiondb } from "./src/config/dbConnection.js";
import cookieParser from "cookie-parser";
import taskRoute from "./src/routes/route.task.js";
import vigilantRoute from "./src/routes/route.vigilant.js";

const app = express();

connectiondb();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).send("Bienvenido a nuestro servidor."));
app.use("/api", mainRouter);
app.use("/api", taskRoute);
app.use("/api", vigilantRoute);

export default app;
