import express from "express";
import { registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/user_register", registerUser)


export default authRouter;
