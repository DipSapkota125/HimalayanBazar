import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  productsAdmin,
} from "../../../../redux/features/adminSlice";
import { toast } from "react-toastify";
import ViewTable from "./ViewTable";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const AllAdminProducts = () => {
  const { loading, error, adminProducts } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(productsAdmin());
  }, [dispatch, error]);
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2>View All products</h2>
        <Link to="/add/admin/product">
          <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Add Product
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                PRODUCTNAME
              </th>
              <th scope="col" className="px-6 py-3">
                PRODUCTIMG
              </th>
              <th scope="col" className="px-6 py-3">
                CATEGORY
              </th>
              <th scope="col" className="px-6 py-3">
                PRICE
              </th>
              <th scope="col" className="px-6 py-3">
                MANUFACTURE
              </th>
              <th scope="col" className="px-6 py-3">
                ISINSTOCK
              </th>
              <th scope="col" className="px-6 py-3">
                RATINGS
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="flex text-center">
                  <Spinner animation="border" size="sm" />
                </td>
              </tr>
            ) : (
              adminProducts &&
              adminProducts.map((item) => (
                <ViewTable key={item._id} item={item} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllAdminProducts;
