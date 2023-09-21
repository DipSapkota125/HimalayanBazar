import React from "react";
import { Link } from "react-router-dom";
import Esewa from "../../../assets/images/eSewa.png";
import Khalti from "../../../assets/images/KhaltiPay.png";
import ImePay from "../../../assets/images/ImePy.png";
import fonePay from "../../../assets/images/FonuPay.png";

const WeAccept = () => {
  return (
    <>
      <div className="font-sans flex flex-wrap justify-evenly items-center">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            CopyRight © 2023{" "}
            <strong>
              <Link to="/" className="text-orange-500">
                Himalayan bazar
              </Link>
            </strong>
            . All Rights Reserved.
          </span>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="flex items-center">
            <img
              src={Esewa}
              alt="Esewa"
              className="h-8 sm:h-10 mx-2 bg-white p-1"
            />
            <img
              src={Khalti}
              alt="Khalti"
              className="h-8 sm:h-10 mx-2 bg-white p-1"
            />
            <img
              src={ImePay}
              alt="ImePay"
              className="h-8 sm:h-10 mx-2 bg-white p-1"
            />
            <img
              src={fonePay}
              alt="fonePay"
              className="h-8 sm:h-10 mx-2 bg-white p-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeAccept;
