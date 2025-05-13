import express from "express";
import { checkUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { userAuth } from "../middlewares/authMiddlware.js";

const authRouter = express.Router();

authRouter.post("/user_register", registerUser)
authRouter.post("/user_login", loginUser)
authRouter.delete("/user_logout", logoutUser)
authRouter.get("/check_user", userAuth, checkUser)


export default authRouter;
