import React from "react";

function CategoryCart({image,name}) {
  return (
      <div className="flex flex-col items-center justify-center gap-4 bg-white border border-blue-950 p-5">
        
          <img
            src={image}
            alt="phone"
            className="w-16 h-16"
          />
        <span className=" font-medium text-base">{name}</span>
      </div>

  );
}

export default CategoryCart;
