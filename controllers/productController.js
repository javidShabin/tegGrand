import Product from "../models/productModel.js";
import cloudinaryInstance from "../configs/cloudinary.js";
import CustomError from "../utils/customError.js";

export const createProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;

  try {
    // Validate fields
    if (!name || !price || !description || !category) {
      throw new CustomError("All fields including image are required", 400);
    }

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