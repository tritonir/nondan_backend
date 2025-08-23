import express from "express";
import userrouter from "./user.route.js";
import airoute from "./ai.js";

const rootRouter = express.Router();

rootRouter.use('/user', userrouter)
rootRouter.use('/ai', airoute)

export default rootRouter;