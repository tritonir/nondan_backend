import express from "express";
import userrouter from "./user.route.js";
import clubRouter from "./club.route.js";
import eventRouter from "./event.route.js";
import airoute from "./ai.js";

const rootRouter = express.Router();

rootRouter.use("/user", userrouter);
rootRouter.use("/club", clubRouter);
rootRouter.use("/event", eventRouter);
rootRouter.use('/ai', airoute);

export default rootRouter;
