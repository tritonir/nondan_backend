import express from "express";
import { SignUp, SignIn } from "../controllers/user.controller.js";
const userrouter = express.Router();

userrouter.post("/auth/signup", SignUp);
userrouter.post("/auth/signin", SignIn);

export default userrouter;
