import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/user_register", registerUser)
authRouter.post("/user_login", loginUser)


export default authRouter;
