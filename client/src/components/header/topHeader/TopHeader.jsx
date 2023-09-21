import React, { useEffect, useState } from "react";
import { FaViber, FaWhatsapp, FaSignInAlt } from "react-icons/fa";
import { FcCustomerSupport, FcIphone } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLogout } from "../../../redux/features/authSlice";
import { toast } from "react-toastify";
import decode from "jwt-decode";

const TopHeader = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage?.getItem("token");

  const [isDropDownShown, setIsDropDownShown] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (userToken) {
      const decodedToken = decode(userToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogout());
        navigate("/login");

        toast.warn("your session expired!,login first");
      }
    }
  }, [dispatch, navigate, userToken]);

  const handleLogout = () => {
    dispatch(setLogout());

    navigate("/");
    toast.success("logout successFully!");
  };

  const handleDarkModeToggle = () => {
    +setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="font-sans headerTop text-secondary pt-1 border-b border-gray py-1">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="text-sm flex items-center space-x-2">
            <FcCustomerSupport className="text-red-500 text-lg lg:text-2xl" />
            <FaViber className="text-blue-500 text-lg lg:text-2xl" />
            <FaWhatsapp className="text-green-500 text-lg lg:text-2xl" />
            <span className="text-black-600">01-56789/9861315260</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="py-1 px-2 text-sm text-secondary border-secondary">
              Himalayan Rewards
            </button>
            <button className="py-1 px-2 text-sm text-secondary border-secondary">
              Sell your Product
            </button>

            <div className="relative">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <button
                    className="flex items-center space-x-2 focus:outline-none"
                    onClick={() => setIsDropDownShown(!isDropDownShown)}
                  >
                    <img
                      src={user?.avatar?.url}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.fullName}</span>
                  </button>
                  {isDropDownShown && (
                    <div className="fixed z-10 top-0 mt-12 w-44 bg-white shadow-sm rounded-sm">
                      <ul className="py-2">
                        <li className="px-4 py-2">
                          <NavLink to="/profile" className="hover:text-red-600">
                            profile
                          </NavLink>
                        </li>
                        {user && user.role === "admin" && (
                          <li className="px-4 py-2">
                            <NavLink
                              to="/admin/himalayan-dashboard/panel"
                              className="hover:text-red-600"
                            >
                              admin dashboard
                            </NavLink>
                          </li>
                        )}
                        <li className="px-4 py-2">
                          <NavLink
                            to="/my/orders"
                            className="hover:text-red-600"
                          >
                            My Orders
                          </NavLink>
                        </li>
                        <li className="px-4 py-2">
                          <NavLink to="/my/cart" className="hover:text-red-600">
                            my cart
                          </NavLink>
                        </li>
                        <li className="px-4 py-2">
                          <NavLink
                            to="/change/password"
                            className="hover:text-red-600"
                          >
                            change password
                          </NavLink>
                        </li>
                        <li className="px-4 py-2">
                          <button onClick={handleLogout}>Log Out</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className="py-1 px-2 text-sm text-secondary border-secondary">
                      Login/Register
                    </button>
                  </NavLink>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Toggle Code */}
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>

              <span className="ml-2">
                <FcIphone size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
