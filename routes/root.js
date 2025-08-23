import express from "express";
import userrouter from "./user.route.js";

const rootRouter = express.Router();


rootRouter.use('/user',userrouter)

export default rootRouter;

