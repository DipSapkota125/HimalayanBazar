import React, { useEffect } from "react";
import BannerPage from "./banner/BannerPage";
import TopPicks from "../../pages/topPicks/TopPicks";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/productSlice";
import Loader from "../../components/layout/loader/Loader";

const Home = () => {
  const { products, loading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="font-sans">
        <BannerPage />
      </div>
      <div className="bg-[#F5F5F5] container mx-auto py-8">
        <h1 className="font-sans text-xl font-bold text-gray-500 hover:text-gray-700 cursor-pointer">
          On Sale Now
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <TopPicks key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center">
                  <h1 className="text-2xl">No Data found</h1>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
