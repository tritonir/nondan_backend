import express from "express";
import userrouter from "./user.route.js";
import clubRouter from "./club.route.js";

const rootRouter = express.Router();

rootRouter.use("/user", userrouter);
rootRouter.use("/club", clubRouter);

export default rootRouter;
