import User from "../models/authModel.js";
import cloudinaryInstance from "../configs/cloudinary.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";
import { generateUserToken } from "../utils/token.js";

// Signup user
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
      password: hashedPassword,
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
// Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email and password provided
    if (!email || !password) {
      throw new CustomError('Email and password are required', 400);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('Invalid email or password', 401);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = generateUserToken({
      _id: user._id,
      email: user.email,
      role: 'user',
    });

    // Set token in cookie
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};
// Logout user
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('userToken'); // Clear the cookie

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};
