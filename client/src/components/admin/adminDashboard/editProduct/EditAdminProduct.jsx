import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  adminUpdateProduct,
  clearError,
  productAdminSingle,
} from "../../../../redux/features/adminSlice";
import Spinner from "react-bootstrap/Spinner";

const EditAdminProduct = () => {
  const { loading, error, adminProduct } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [editValue, setEditValue] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    ratings: "",
    manufacture: "",
    isInStock: "",
    SKU: "",
  });

  const {
    productName,
    description,
    price,
    category,
    ratings,
    manufacture,
    isInStock,
    SKU,
  } = editValue;

  const [productImgReview, setProductImgReview] = useState("");
  const [productImg, setProductImg] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProductImgReview(reader.result);
        setProductImg(file);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("manufacture", manufacture);
    formData.append("ratings", ratings);
    formData.append("isInStock", isInStock);
    formData.append("SKU", SKU);
    formData.append("productImg", productImg);

    dispatch(adminUpdateProduct({ id, formData, toast, navigate }));
  };

  useEffect(() => {
    if (adminProduct) {
      setEditValue({
        productName: adminProduct.productName || "",
        description: adminProduct.description || "",
        price: adminProduct.price || "",
        manufacture: adminProduct.manufacture || "",
        ratings: adminProduct.ratings || "",
        isInStock: adminProduct.isInStock || "",
        SKU: adminProduct.SKU || "",
        category: adminProduct.category || "",
      });
      setProductImgReview(adminProduct?.productImg?.url || "");
    }
  }, [adminProduct]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(productAdminSingle(id));
  }, [dispatch, error, id]);
  return (
    <>
      <div className="flex space-x-2">
        <Link to="/admin/himalayan-dashboard/panel">
          <FaArrowLeft />
        </Link>
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      </div>
      <div className="bg-white p-8 rounded shadow">
        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product name"
              value={productName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product price"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">Ratings</label>
            <input
              type="number"
              name="ratings"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product ratings"
              value={ratings}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Manufacture
            </label>
            <input
              type="text"
              name="manufacture"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product manufacture"
              value={manufacture}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              name="SKU"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product SKU"
              value={SKU}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product category"
              value={category}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">IsInStock</label>
            <input
              type="number"
              name="isInStock"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product isInStock"
              value={isInStock}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">productImg</label>
            <input
              type="file"
              accept="image/*"
              name="productImg"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter productImg"
              onChange={handleFileChange}
            />
            <img src={productImgReview} alt="product Img" />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product description"
              rows="4"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Add other fields similar to the ones above */}
          <div className="w-full px-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
              {loading && <Spinner animation="border" size="sm" />}Edit Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAdminProduct;
