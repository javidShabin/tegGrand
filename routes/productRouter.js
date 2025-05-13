import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  productList,
  updateProductById,
} from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";

const productRouter = express.Router();

productRouter.post("/create_product", upload.single("image"), createProduct);
productRouter.get("/product_list", productList);
productRouter.get("/get_product/:productId", getProductById);
productRouter.put(
  "/update_product/:productId",
  upload.single("image"),
  updateProductById
);
productRouter.delete("/delete_product/:productId", deleteProductById);

export default productRouter;
