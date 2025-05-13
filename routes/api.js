import express from "express";
import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";

const apiRouter = express.Router();

apiRouter.use("/authentication", authRouter)
apiRouter.use("/product", productRouter)


export default apiRouter;
