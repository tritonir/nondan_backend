import express from 'express'
import { SignUp, SingIn } from '../controllers/user.controller.js'
const userrouter = express.Router()


userrouter.post('/singup', SignUp);
userrouter.post('/singin', SingIn);

export default userrouter