import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/user_register", registerUser)
authRouter.post("/user_login", loginUser)
authRouter.delete("/user_logout", logoutUser)


export default authRouter;
