import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { tryCatchAsyncError } from "./tryCatchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//for authenticated users
export const isAuthenticated = tryCatchAsyncError(async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "");
  if (!token) return next(new ErrorHandler("please login at first", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedData.id);
  if (!user) return next(new ErrorHandler("user doesn't exist!", 400));

  req.user = user;
  next();
});

//for admin only

export const isAuthAdmin = tryCatchAsyncError(async (req, res, next) => {
  if (!req.user)
    return next(
      new ErrorHandler("You must be authenticate to access this resource", 401)
    );

  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not authorize to access this resource`,
        403
      )
    );
  next();
});
