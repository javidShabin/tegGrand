import User from "../models/authModel";
import cloudinaryInstance from "../configs/cloudinary";
import bcrypt from "bcrypt";

export const registerUser = async (req, res, next) => {
    const {fullName, email, phone, password,profilePictur} = req.body
}