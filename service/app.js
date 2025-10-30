import express from "express";
import 'dotenv/config';
import mainRouter from "./src/routes/route.main.js";
import { connectiondb } from "./src/config/dbConnection.js";
import cookieParser from "cookie-parser";
import taskRoute from "./src/routes/route.task.js";
import vigilantRoute from "./src/routes/route.vigilant.js";
import cors from "cors";

const app = express();

connectiondb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://deploy-vercel-frontendt-is.vercel.app', credentials: true }))
app.use("/api", mainRouter);
app.use("/api", taskRoute);
app.use("/api", vigilantRoute);

const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
    console.log("El servidor está trabajando en el puerto: " + PORT);
});
