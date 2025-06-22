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

const allowedOrigins = [
  "https://client-vercel-pnc.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/meg", mainRouter);
app.use("/meg", taskRoute);
app.use("/meg", vigilantRoute);

const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
    console.log("El servidor está trabajando en el puerto: " + PORT);
});
