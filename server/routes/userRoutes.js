import express from "express";
import {
  LoggedInUser,
  changePassword,
  login,
  register,
  updateProfile,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../file/upload.js";

const router = express.Router();

//register
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, LoggedInUser);
router
  .route("/update/me")
  .put(isAuthenticated, upload.single("avatar"), updateProfile);

//change password
router.route("/change/password").put(isAuthenticated, changePassword);

export default router;
