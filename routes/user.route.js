import express from "express";
import { SignUp, SignIn } from "../controllers/user.controller.js";
const userrouter = express.Router();

userrouter.post("/auth/signup", SignUp);
userrouter.post("/auth/login", SignIn);

export default userrouter;
