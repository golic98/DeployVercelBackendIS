import express from "express";
import mainRouter from "./src/routes/route.main.js";
import { connectiondb } from "./src/config/dbConnection.js";
import cookieParser from "cookie-parser";
import taskRoute from "./src/routes/route.task.js";
import cors from "cors";
import vigilantRoute from "./src/routes/route.vigilant.js";

const app = express();

connectiondb();

app.use(cors({
  origin: [
    process.env.SERVICE_URL,
    'http://localhost:5173',
  ],
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api", mainRouter);
app.use("/api", taskRoute);
app.use("/api", vigilantRoute);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos al servidor DDG 🚀" });
});

export default app;
