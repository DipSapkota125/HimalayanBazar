import express from "express";
import {
  allProducts,
  allProductsAdmin,
  categoryProducts,
  createProduct,
  deleteProduct,
  singleAdminProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../file/upload.js";
import { isAuthAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//create product
router.post(
  "/create/product",
  isAuthenticated,
  isAuthAdmin,
  upload.single("productImg"),
  createProduct
);
//all products
router.get("/all/products", allProducts);
//single product
router.get("/single/product/:id", singleProduct);
//category products
router.get("/category/products/:category", categoryProducts);

//update product
router.put(
  "/update/product/:id",
  isAuthenticated,
  isAuthAdmin,
  upload.single("productImg"),
  updateProduct
);
//delete product
router.delete(
  "/delete/product/:id",
  isAuthenticated,
  isAuthAdmin,
  deleteProduct
);

//admin get all products
router
  .route("/all/admin/products")
  .get(isAuthenticated, isAuthAdmin, allProductsAdmin);

//get singleAdminProduct
router
  .route("/single/admin/product/:id")
  .get(isAuthenticated, isAuthAdmin, singleAdminProduct);

export default router;
