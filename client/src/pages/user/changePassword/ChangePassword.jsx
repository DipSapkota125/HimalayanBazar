import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, clearError } from "../../../redux/features/authSlice";
import Spinner from "react-bootstrap/Spinner";

const ChangePassword = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changeValue, setChangeValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changeErr, setChangeErr] = useState({});

  const { oldPassword, newPassword, confirmPassword } = changeValue;
  const handleChange = (e) => {
    let { name, value } = e.target;
    setChangeValue({ ...changeValue, [name]: value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const validatedForm = () => {
    let newErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "OldPassword is required!";
    }
    if (!newPassword) {
      newErrors.newPassword = "NewPassword is required!";
    } else if (newPassword.length < 8) {
      newErrors.oldPassword = "NewPassword must be 8 characters Long!";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "confirmPassword is required!";
    } else if (confirmPassword.length < 8) {
      newErrors.oldPassword = "confirmPassword must be 8 characters Long!";
    }

    setChangeErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      dispatch(changePassword({ changeValue, toast, navigate }));
    } else {
      return toast.warn("Invalid Input!");
    }
  };
  return (
    <>
      <div className="font-sans max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              OLD PASSWORD
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={oldPassword}
              onChange={handleChange}
            />
            {changeErr && (
              <span className="text-sm text-red-500">
                {changeErr.oldPassword}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              NEW PASSWORD
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={newPassword}
              onChange={handleChange}
            />
            {changeErr && (
              <span className="text-sm text-red-500">
                {changeErr.newPassword}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={handleChange}
            />
            {changeErr && (
              <span className="text-sm text-red-500">
                {changeErr.newPassword}
              </span>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading && <Spinner animation="border" size="sm" />} Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
