import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  productDelete,
} from "../../../../redux/features/adminSlice";
import { toast } from "react-toastify";

const ViewTable = ({ item }) => {
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(productDelete({ id, toast }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.productName}
      </th>
      <td className="px-6 py-4">
        <img
          src={item?.productImg?.url}
          alt={item.productName}
          className="w-24 h-24 object-cover"
        />
      </td>
      <td className="px-6 py-4">{item.category}</td>
      <td className="px-6 py-4">Rs.{item.price}</td>
      <td className="px-6 py-4">{item.manufacture}</td>
      <td className="px-6 py-4">{item.isInStock}</td>
      <td className="px-6 py-4">{item.ratings}</td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <Link className="text-blue-500">
            <FaEye />
          </Link>
          <Link
            to={`/edit/admin/product/${item._id}`}
            className="text-yellow-500"
          >
            <FaPencilAlt />
          </Link>
          <Link className="text-red-600" onClick={() => handleDelete(item._id)}>
            <FaTrash />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ViewTable;
