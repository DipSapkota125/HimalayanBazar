import React from "react";
// import { Link } from "react-router-dom";
import NotFound from "../../assets/images/NotFoundPage.png";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans">
      <h1 className="text-center text-3xl text-gray-700 mb-4">
        OOP's Page not Found!
      </h1>
      <img src={NotFound} alt="not foundImg" className="mb-8 max-w-full" />
      {/* <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
      >
        Back to Home
      </Link> */}
    </div>
  );
};

export default PageNotFound;
