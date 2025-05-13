import Product from "../models/productModel.js";
import cloudinaryInstance from "../configs/cloudinary.js";
import CustomError from "../utils/customError.js";

// Create new product
export const createProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;

  try {
    // Validate fields
    if (!name || !price || !description || !category)
      throw new CustomError("All fields including image are required", 400);

    // Check the product already exist in database
    const isProductExist = await Product.findOne({ name });
    if (isProductExist) throw new CustomError("The product is already exists");

    // Upload image
    let uploadResult;
    try {
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
    } catch (uploadError) {
      return res.status(500).json({
        success: false,
        message: "File upload failed",
        error: uploadError.message,
      });
    }

    // Save product
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image: uploadResult.secure_url,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
// Get all product list
export const productList = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0)
      throw new CustomError("No products found", 404);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};
// Get single product by Id
export const getProductById = async (req, res, next) => {
  const { productId } = req.body;

  try {
    if (!productId) {
      throw new CustomError("Product ID is required", 400);
    }
// Find the product using id
    const product = await Product.findById(productId);

    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
