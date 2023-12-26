import React, { useState, useEffect } from "react";
import axios from "axios";
import StarsRating from "./StarsRating";
import Navette from "../assets/Navette";
import Return from "../assets/Return";

const Product = ({related}) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/getproduct/16"
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(product);

  return (
    <div className="flex flex-col px-32 py-16">
    <div className="flex gap-28  ">
      {product && (
        <>
          <div className="flex gap-5  justify-center">
            <div className="flex flex-col gap-3 ">
              {" "}
              {product.images.map((image, index) => (
                <button
                  className={`rounded-md cursor-pointer ${
                    activeImage === index ? "border-black border" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    className=" h-40 w-40 bg-[#F5F5F5] rounded-md"
                    key={image.Image_ID}
                    src={image.Image_URL.slice(18)}
                    alt="Product"
                  />
                </button>
              ))}
            </div>
            <div className="bg-[#F5F5F5] rounded-md ">
              <img
                src={product.images[activeImage].Image_URL.slice(18)}
                alt="Product"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="product-details">
            <h2 className="text-xl font-bold mb-2">{product.Name}</h2>

            <StarsRating
              rating={product.AverageStars}
              scale="scale-150  translate-x-[114px]"
            />
            <div className="mt-4">
              <span className="text-gray-500 line-through mr-2  text-2xl">
                {product.OldPrice} DA
              </span>
              <span className="text-green-500 font-bold text-2xl">
                {product.Price} DA
              </span>
            </div>
            <p className="text-black text-lg mb-4">{product.Description}</p>
            <hr className="border-t-2 border-black mt-4 mb-4 opacity-30" />
            <div className="flex items-center justify-between gap-16  ">
              <div className="border flex justify-between  items-center   w-24 ">
                <button
                  className="bg-white border text-gray-700 px-2 py-1 rounded w-8"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  className="bg-[#DB4444] text-white px-2 py-1 rounded w-8"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
              <button className="bg-[#DB4444] text-white px-4 py-2 rounded  w-40 ">
                Buy Now
              </button>
            </div>
            <div className="flex flex-col mt-8 ">
              <div className="py-2 px-4 border border-b-0 flex gap-4 items-center">
                <Navette />
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-lg">Delivery</h1>
                  <h4 className="text-base">
                    Enter your postal code for Delivery Availability
                  </h4>
                </div>
              </div>
              <div className="py-2 px-4 border flex gap-4 items-center">
                <Return />
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-lg">Return Delivery</h1>
                  <h4 className="text-base">
                  Free 30 Days Delivery Returns. Details
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    <div className="border border-l-[#DB4444] border-l-[11px] self-start mt-8">
        <h1 className="text-center text-[#DB4444] font-bold text-xl p-2">Related Items</h1>
    </div>
    {related}
    </div>
  );
};

export default Product;
