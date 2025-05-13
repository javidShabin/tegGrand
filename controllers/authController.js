import User from "../models/authModel.js";
import cloudinaryInstance from "../configs/cloudinary.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";

export const registerUser = async (req, res, next) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;

  try {
    // Check the required fields are present or not
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      throw new CustomError("All fields are required", 400);
    }
    // Match the password and confirm password
    if (password !== confirmPassword)
      throw new CustomError("Passwords do not match", 422);
    // Check the user is already present in database
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new CustomError("User already exists", 409);
    }
    // Hash the password using bcrypt 
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
  } catch (error) {
    next(error);
  }
};
