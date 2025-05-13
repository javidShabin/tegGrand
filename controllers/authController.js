import User from "../models/authModel";
import cloudinaryInstance from "../configs/cloudinary";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";

export const registerUser = async (req, res, next) => {
  const { fullName, email, phone, password, confirmPassword, profilePicture } = req.body;

  try {
    // Check the required fields are present or not
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      throw new CustomError('All fields are required', 400);
    }

    
  } catch (error) {
    next(error);
  }
};
