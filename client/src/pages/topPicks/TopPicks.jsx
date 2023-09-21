import React from "react";
import { Link } from "react-router-dom";

const TopPicks = ({ product }) => {
  return (
    <>
      <div className="font-sans bg-[#fff] flex flex-col items-center p-4 space-y-2">
        <Link to={`/product/details/${product._id}`}>
          <img
            className="w-32 h-32 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 my-4 mt-2"
            src={product.productImg.url}
            alt={product.productName}
          />
          <h2 className="text-secondary text-gray-500 my-2">
            {product.productName}
          </h2>
          <span className="text-gray-700 font-bold">Rs.{product.price}</span>
        </Link>
      </div>
    </>
  );
};

export default TopPicks;
