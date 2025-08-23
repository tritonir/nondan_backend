import express from "express";
import { SignUp, SignIn } from "../controllers/user.controller.js";
const userrouter = express.Router();

userrouter.post("/singup", SignUp);
userrouter.post("/signin", SignIn);

export default userrouter;
