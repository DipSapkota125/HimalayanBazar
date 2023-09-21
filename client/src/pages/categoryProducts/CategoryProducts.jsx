import React from "react";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";

const CategoryProducts = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <>
      <div className="bg-[#F5F5F5] container mx-auto py-8">
        <h1 className="font-sans text-xl font-bold text-gray-500 hover:text-gray-700 cursor-pointer">
          Related Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-2">
          {products && products.length > 0 ? (
            products.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))
          ) : (
            <div className="col-span-full text-center">
              <h1 className="text-2xl">No Data found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
