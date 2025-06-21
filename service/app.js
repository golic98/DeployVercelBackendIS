import express from "express";
import 'dotenv/config';
import mainRouter from "./src/routes/route.main.js";
import { connectiondb } from "./src/config/dbConnection.js";
import cookieParser from "cookie-parser";
import taskRoute from "./src/routes/route.task.js";
import cors from "cors";
import vigilantRoute from "./src/routes/route.vigilant.js";

const app = express();

connectiondb();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/meg", mainRouter);
app.use("/meg", taskRoute);
app.use("/meg", vigilantRoute);

export default app;