import React from "react";
import { DataServices } from "./Data";

const Services = () => {
  return (
    <>
      <div className="font-sans px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <h1 className="text-2xl font-bold mb-4">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {DataServices.map((value, index) => (
            <div
              key={value.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
            >
              <img
                src={value.image_url}
                alt={value.title}
                className="w-full h-36 object-cover rounded-md mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                style={{ objectFit: "cover" }}
              />
              <h2 className="text-gray-500 font-semibold hover:text-orange-500">
                {value.title}
              </h2>
              <h6 className="mt-2 text-gray-600">{value.description}</h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
