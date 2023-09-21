import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, singleProducts } from "../../redux/features/productSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/layout/loader/Loader";
import ReactStars from "react-rating-stars-component";
import CategoryProducts from "../categoryProducts/CategoryProducts";

const ProductDetails = () => {
  const { product, loading, error } = useSelector((state) => state.product);

  const options = {
    edit: false,
    isHalf: true,
    value: product.ratings,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffd700",
    size: window.innerWidth < 600 ? 12 : 16,
  };
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
    setShowDelivery(false);
    setShowInstructions(false);
  };

  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
    setShowDetails(false);
    setShowDelivery(false);
  };

  const handleShowDelivery = () => {
    setShowDelivery(!showDelivery);
    setShowDetails(false);
    setShowInstructions(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(singleProducts(id));
  }, [dispatch, id, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="font-sans container mx-auto px-8 py-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4 bg-[#FFFFFF] border flex justify-center items-center">
              {/* Left Side Image */}
              <div
                className="relative max-w-md mx-auto overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={product?.productImg?.url}
                  alt="Product"
                  className={`w-full h-auto rounded object-cover cursor-pointer transition-transform duration-300 ${
                    isHovered ? "scale-150" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 hidden md:flex justify-center items-center bg-black bg-opacity-10 rounded-md cursor-zoom-in">
                  {/* Use the same image source for the enlarged version */}
                  <img
                    src={product?.productImg?.url}
                    alt="Product"
                    className={`w-full h-auto rounded-md ${
                      isHovered ? "scale-2" : "scale-0"
                    }`}
                    style={{
                      transformOrigin: "center",
                      transform: isHovered ? "scale(2)" : "scale(0)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="px-4">
              <div>
                {/* Right Side Content */}
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  {product.productName}
                </h2>
                {/* for ratings */}
                <div className="flex items-center mb-2">
                  <div className="mr-2">
                    <span className="text-yellow-500">
                      <ReactStars {...options} />
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">(customer reviews)</span>
                  </div>
                </div>
                <div className="mb-4">
                  {/* Price */}
                  <span className="text-3xl text-orange-500 font-semibold">
                    Rs.{product.price}
                  </span>
                  <hr className="border-b border-dotted w-3/5 border-gray-400 mt-2" />
                </div>
                {/* isInStock */}
                {product && (
                  <p
                    className={
                      product.isInStock
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {product.isInStock ? "In Stock" : "Out of Stock"}
                  </p>
                )}
                {/* Quantity Control */}
                <div className="flex items-center mt-3 text-gray-700">
                  <span className="mr-2">Qty:</span>
                  <div className="flex">
                    <button className="px-2 py-1 bg-gray-200 rounded-l">
                      -
                    </button>
                    <input
                      type="text"
                      className="w-12 px-2 py-1 text-center focus:outline-none bg-gray-100"
                      min={1}
                    />
                    <button className="px-2 py-1 bg-gray-200 rounded-r">
                      +
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  {/* Select Flavor */}
                  <label
                    htmlFor="flavor"
                    className="font-semibold text-gray-700 mb-2 block"
                  >
                    Select category:
                  </label>
                  <div className="flex">
                    <select
                      id="flavor"
                      className="w-64 border focus:outline-none rounded py-2 px-3"
                    >
                      <option value="chocolate">Select category</option>
                      <option value="chocolate">shoe</option>
                      <option value="vanilla">electronics</option>
                      <option value="strawberry">handMade</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4 flex space-x-2">
                  {/* Buttons */}
                  <button
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-64"
                    disabled={product?.isInStock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                  <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-64">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 bg-gray-50 border flex flex-col">
            <div className="flex flex-wrap">
              <h2
                className={`py-2 px-2 font-semibold hover:text-orange-500 cursor-pointer bg-accordion my-2 ${
                  showDetails ? "text-orange-500" : ""
                }`}
                onClick={handleToggleDetails}
              >
                Product Details
              </h2>
              <h2
                className={`text-gray-700 hover:text-orange-500 font-semibold cursor-pointer py-2 px-2 mr-4 my-2 ${
                  showDelivery ? " text-orange-500" : ""
                }`}
                onClick={handleShowDelivery}
              >
                Delivery Information
              </h2>
              <h2
                className={`text-gray-700 py-2 hover:text-orange-500 cursor-pointer font-semibold my-2 ${
                  showInstructions ? " text-orange-500" : ""
                }`}
                onClick={handleShowInstructions}
              >
                Instructions
              </h2>
            </div>

            {showDetails && (
              <ul className="list-disc w-full sm:w-3/5 bg-[#FFFFFF] pl-6 mt-2">
                {product.description}
              </ul>
            )}

            {showDelivery && (
              <ul className="list-disc w-full sm:w-3/5 bg-[#FFFFFF] pl-6 mt-2">
                <li className="text-gray-700">
                  Every cake we offer is handcrafted and since each bakery has
                  its own way of baking and designing a cake, there might be
                  slight variation in the product in terms of design and shape.
                </li>
                <li className="text-gray-700">
                  The chosen delivery time is an estimate and depends on the
                  availability of the product and the destination to which you
                  want the product to be delivered.
                </li>
                <li className="text-gray-700">
                  Since cakes are perishable in nature, we attempt delivery of
                  your order only once. The delivery cannot be redirected to any
                  other address.
                </li>
                <li className="text-gray-700">
                  This product is hand-delivered and will not be delivered along
                  with courier products.
                </li>
                <li className="text-gray-700">
                  Occasionally, substitutions of flavors/designs are necessary
                  due to temporary unavailability issues.
                </li>
                <li className="text-gray-700">
                  Delivery available at Kathmandu, Lalitpur, and Bhaktapur.
                </li>
              </ul>
            )}

            {showInstructions && (
              <ul className="list-disc w-full sm:w-3/5 bg-[#FFFFFF] pl-6 mt-2">
                <li className="text-gray-700">
                  Store cream cakes in a refrigerator. Fondant cakes should be
                  stored in an air-conditioned environment.
                </li>
                <li className="text-gray-700">
                  Slice and serve the cake at room temperature and make sure it
                  is not exposed to heat.
                </li>
                <li className="text-gray-700">
                  Use a serrated knife to cut a fondant cake
                </li>
                <li className="text-gray-700">
                  Sculptural elements and figurines may contain wire supports or
                  toothpicks or wooden skewers for support.
                </li>
                <li className="text-gray-700">
                  Please check the placement of these items before serving to
                  small children.
                </li>
                <li className="text-gray-700">
                  The cake should be consumed within 24 hours.
                </li>
                <li className="text-gray-700">Enjoy your cake!</li>
              </ul>
            )}
          </div>
        </div>
      )}
      <div>
        <CategoryProducts />
      </div>
    </>
  );
};

export default ProductDetails;
