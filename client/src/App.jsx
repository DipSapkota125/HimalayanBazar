import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import About from "./pages/aboutUs/About";
import MoreInfo from "./pages/moreInfo/MoreInfo";
import Footer from "./components/footer/Footer";
import TopHeader from "./components/header/topHeader/TopHeader";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Contact from "./pages/contact/Contact";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Register from "./pages/user/register/Register";
import Login from "./pages/user/login/Login";
import Profile from "./pages/user/profile/Profile";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts";
import ChangePassword from "./pages/user/changePassword/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/features/authSlice";
import ProtectedRoute from "./utils/protectedRoute/ProtectedRoute";
import AdminDashboard from "./components/admin/adminDashboard/AdminDashboard";
import AddAdminProduct from "./components/admin/adminDashboard/addAdminProducts/AddAdminProduct";
import EditAdminProduct from "./components/admin/adminDashboard/editProduct/EditAdminProduct";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(profile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Router>
        <ToastContainer position="bottom-right" />
        <TopHeader isAuthenticated={isAuthenticated} user={user} />
        <Header />
        <Routes>
          <Route
            path="/admin/himalayan-dashboard/panel"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add/admin/product"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <AddAdminProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/admin/product/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <EditAdminProduct />
              </ProtectedRoute>
            }
          />

          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/change/password" element={<ChangePassword />} />
          <Route path="/product/details/:id" element={<ProductDetails />} />
          <Route
            path="/category/products/:category"
            element={<CategoryProducts />}
          />
          <Route path="/about/" element={<About />} />
          <Route path="/more-info" element={<MoreInfo />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
