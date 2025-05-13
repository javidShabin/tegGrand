import express from "express";
import { createProduct, getProductById, productList } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";


const productRouter = express.Router();

productRouter.post("/create_product", upload.single("image"), createProduct)
productRouter.get("/product_list", productList)
productRouter.get("/get_product/:productId", getProductById)


export default productRouter;
