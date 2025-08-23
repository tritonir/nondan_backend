import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rootRouter from "./routes/root.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", rootRouter);

export default app;
