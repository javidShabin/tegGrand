import User from "../models/authModel";
import cloudinaryInstance from "../configs/cloudinary";
import bcrypt from "bcrypt";

export const registerUser = async ()