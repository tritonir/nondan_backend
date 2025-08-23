import express from "express";
import userrouter from "./user.route.js";
import clubRouter from "./club.route.js";
import eventRouter from "./event.route.js";

const rootRouter = express.Router();

rootRouter.use("/user", userrouter);
rootRouter.use("/club", clubRouter);
rootRouter.use("/event", eventRouter);

export default rootRouter;
