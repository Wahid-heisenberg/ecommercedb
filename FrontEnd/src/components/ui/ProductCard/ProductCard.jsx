import React from "react";
import Rating from "../Rating/Rating";

const ProductCard = ({ product, ...props }) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="w-full h-64 overflow-hidden">
          <img
            className="w-full object-cover h-full hover:scale-110 transition-all duration-300"
            src={product.image}
            alt="image"
          />
        </div>
        <h1 className="text-lg font-semibold" >{product.Name} </h1>
        <span className="text-lg text-bgButton font-semibold " > ${product.Price} </span>
        <div className="flex items-center gap-3">
          <Rating rate={product.rating} className="w-5 h-5 " />
          <span className="text-grayText font-semibold">({product.totalRatings}) </span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
