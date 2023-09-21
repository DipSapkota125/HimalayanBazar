import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <>
      <div className="font-sans bg-[#fff] flex flex-col items-center p-4 space-y-2">
        <Link to={`/product/details/${category._id}`}>
          <img
            className="w-32 h-32 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 my-4 mt-2"
            src={category.productImg.url}
            alt={category.productName}
          />
          <h2 className="text-secondary text-gray-500 my-2">
            {category.productName}
          </h2>
          <span className="text-gray-700 font-bold">Rs.{category.price}</span>
        </Link>
      </div>
    </>
  );
};

export default CategoryCard;
