import express from "express";
import authRouter from "./authRouter.js";

const apiRouter = express.Router();

apiRouter.use("/authentication", authRouter)


export default apiRouter;
