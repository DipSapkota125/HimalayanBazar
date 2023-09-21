import axios from "axios";

const devEnv = import.meta.env.MODE !== "production";
const devApiUrl = import.meta.env.VITE_REACT_APP_DEV_API;
const prodAPiUrl = import.meta.env.VITE_REACT_APP_PROD_API;

// Create axios instance
const API = axios.create({
  baseURL: devEnv ? devApiUrl : prodAPiUrl,
});

//interceptors
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
  }
  return req;
});

//user register
export const userRegister = (formData) => API.post("/register", formData);
//user Login
export const userLogin = (loginValue) => API.post("/login", loginValue);

//getProfile
export const userProfile = () => API.get("/me");

//change password
export const passwordUpdate = (changeValue) =>
  API.put("/change/password", changeValue);

//update profile
export const updateProfile = (updateForm) => API.put("/update/me", updateForm);

//get all products
export const getAllProducts = () => API.get("/all/products");

//get all category relatedProducts
export const productsCategory = (category) =>
  API.get(`/category/products/${category}`);

//get single Product
export const getSingleProduct = (id) => API.get(`/single/product/${id}`);

//admin getAllProducts
export const getAdminProducts = () => API.get("/all/admin/products");

//add product(admin)
export const addProduct = (formData) => API.post("/create/product", formData);
//delete Product
export const deleteProduct = (id) => API.delete(`/delete/product/${id}`);

//single admin product
export const singleAdminProduct = (id) =>
  API.get(`/single/admin/product/${id}`);

//admin update product
export const updateAdminProduct = (formData, id) =>
  API.put(`/update/product/${id}`, formData);
