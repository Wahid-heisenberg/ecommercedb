import React from "react";

const Promotions = ({ image, title, text, className, ...props }) => {
  return (
    <div className="relative">
      <img src={image} alt={title} className="h-full object-cover" />
      <div className="absolute bottom-10 left-8 flex flex-col items-start gap-2  ">
        <span className="text-white font-semibold text-lg">{title} </span>
        <p
          className={`text-white text-sm  ${text.length > 30 ? "w-4/5" : ""}  `}
        >
          {" "}
          {text}{" "}
        </p>
        <button className="text-white border-b-[1px] ">Shop Now</button>
      </div>
    </div>
  );
};

export default Promotions;
