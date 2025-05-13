import express from "express";
import { createProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";


const productRouter = express.Router();

productRouter.post("/create_product", upload.single("image"), createProduct)


export default productRouter;
