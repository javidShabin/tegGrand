import User from "../models/authModel.js";
import cloudinaryInstance from "../configs/cloudinary.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";
import { generateUserToken } from "../utils/token.js";

export const registerUser = async (req, res, next) => {
  const { fullName, email, phone, password, confirmPassword, profilePicture } = req.body;

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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = new User({
      fullName,
      email,
      password,
      phone,
      profilePicture,
    });
    await newUser.save();

    // Generate user toke
    const token = generateUserToken({
      _id: newUser._id,
      email: newUser.email,
      role: "user",
    });
    // Set the token to cookie
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};
