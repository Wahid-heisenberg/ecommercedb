import React from "react";
import CartIcon from "../assets/CartIcon";
const ProductCart = ({ products }) => {
  return (
    <div className="grid grid-cols-5  gap-4 p-16 ">
      {products.map((product) => (
        <div key={product.product_ID} className="flex flex-col relative">
          <img
            src={product.Images[0].Image_URL.slice(18)}
            alt="Product Image"
            className=""
          />
          <span className=" absolute left-1 top-1 bg-[#DB4444] text-xs  text-white rounded-sm py-1 px-2 font-semibold">
            -35%
          </span>
          <button className="flex items-center justify-center gap-2 p-1 text-white bg-black hover:bg-slate-900 transition-colors ">
            <CartIcon className="text-white" stroke="white" />
            <span className="text-sm">Add To Cart</span>
          </button>
          <h2 className="mt-1 text-sm font-semibold">
            {product.product_Name}
          </h2>
          <p className="text-xs">{product.Description}</p>
          <div className="flex gap-2">
            {product.Price && (
              <>
            <span className="text-xs text-[#DB4444] font-semibold">{product.Price} DA</span>
              </>
            )}
            {product.OldPrice && product.OldPrice !== product.Price && (
              <span>{product.OldPrice}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCart;
