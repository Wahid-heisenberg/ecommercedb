import React from "react";
import promotion1 from "../assets/promotion1.png";
import promotion3 from "../assets/promotion3.png";
import promotion4 from "../assets/promotion4.png";
import promotion5 from "../assets/promotion5.png";
import PromotionContent from "./PromotionContent";

function PromotionsGrid() {
  return (
    <div className="grid grid-flow-row grid-rows-2 grid-cols-4 gap-8  ">
      <div
        className="col-span-2 row-span-2 border bg-no-repeat bg-black bg-center bg-cover h-[644px] relative w-full "
        style={{ backgroundImage: `url(${promotion1})` }}
      >
        <PromotionContent
          title="Play Station 5"
          des1="Black and White version of the PS5"
          des3="coming out on sale."
        />
      </div>
      <div
        className="row-span-1 col-span-2 border bg-no-repeat bg-black bg-center bg-cover h-  w-full relative"
        style={{ backgroundImage: `url(${promotion3})` }}
      >
        <PromotionContent
          title="Women’s Collections"
          des1="Featured woman collections that"
          des3="give you another vibe."
        />
      </div>

      <div
        className="row-span-1 col-span-1 border bg-no-repeat bg-black bg-center bg-fit h-full w-full relative"
        style={{ backgroundImage: `url(${promotion4})` }}
      >
        <PromotionContent title="Speakers" des1="Amazon wireless speakers" />
      </div>
      <div
        className="row-span-1 col-span-1 border bg-no-repeat bg-black bg-center bg-fit h-full w-full relative"
        style={{ backgroundImage: `url(${promotion5})` }}
      >
        <PromotionContent title="Perfume" des1="GUCCI INTENSE OUD EDP" />
      </div>
    </div>
  );
}

export default PromotionsGrid;
