import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";
export const userAuth = (req, res, next) => {
  try {
    // Get token from cookies
    const { userToken } = req.cookies;
    // Check user token is present
    if (!userToken) throw new CustomError("User not authorized0", 401);
    // verify the token
    const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    if (!verifyToken) throw new CustomError("User not authorized", 401);
    req.user = verifyToken;
    next();
  } catch (error) {
    next(error);
  }
};
