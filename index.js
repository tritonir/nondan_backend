import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rootRouter from "./routes/root.js";

dotenv.config();

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", rootRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
