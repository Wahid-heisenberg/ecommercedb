import React from 'react'
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
function PromotionContent( {title , des1 , des3}  ) {
  return (
    <div className="absolute bottom-0 left-0 p-4 ">
    <h1 className="text-white text-3xl capitalize font-bold my-2 text-left leading-[64px]">
    {title } 
    </h1>
    <h4 className="text-white text-md mb-2 text-left">
    {des1 } {des3 && <><br /> {des3} </> } 
    </h4>
    <button className="bg-transparent items-center text-white text-center py-2 px-4 flex gap-3 ">
      <span className="underline">Shop Now</span>
      <ArrowForwardOutlinedIcon className="w-6 h-6" />
    </button>
  </div>
  )
}

export default PromotionContent