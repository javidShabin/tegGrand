import express from "express";
import { createProduct, productList } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";


const productRouter = express.Router();

productRouter.post("/create_product", upload.single("image"), createProduct)
productRouter.get("/product_list", productList)


export default productRouter;
