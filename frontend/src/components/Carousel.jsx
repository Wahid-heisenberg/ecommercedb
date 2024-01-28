import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import apple from "../assets/apple.png";
import iphone from "../assets/iphone.png";
import manette from '../assets/manette.png'
function RCarousel() {
  return (
    <div className=" ">
      <Carousel 
      autoPlay={true}
      showThumbs={true}
      infiniteLoop={true}
      stopOnHover={true}
      useKeyboardArrows={true}
      showStatus={false}
      >
        <div className="flex items-center justify-between bg-black py-4 px-12 ">
          <div className="flex flex-col">
            <div className="flex items-center justify-left gap-3">
              <div>
                <img src={apple} alt="applelogo" className=" " />
              </div>
              <span className="text-white text-md ">iPhone 14 Series</span>
            </div>
            <h1 className="text-white text-5xl capitalize font-bold my-2 text-left leading-[64px]">
              Up to 10% <br />
              off Voucher
            </h1>
            <button className="bg-transparent items-center text-white text-center py-2 px-4 flex gap-3 ">
              <span className="underline">Shop Now</span>
              <ArrowForwardOutlinedIcon className="w-6 h-6" />
            </button>
          </div>

          <div>
            <img src={iphone} />
          </div>
        </div>

        <div className="flex items-center justify-between bg-black py-4 px-12 ">
          <div className="flex flex-col">
            <div className="flex items-center justify-left gap-3">
              <div>
                <img src={apple} alt="applelogo" className=" " />
              </div>
              <span className="text-white text-md ">iPhone 14 Series</span>
            </div>
            <h1 className="text-white text-5xl capitalize font-bold my-2 text-left leading-[64px]">
              Up to 10% <br />
              off Voucher
            </h1>
            <button className="bg-transparent items-center text-white text-center py-2 px-4 flex gap-3 ">
              <span className="underline">Shop Now</span>
              <ArrowForwardOutlinedIcon className="w-6 h-6" />
            </button>
          </div>

          <div>
            <img src={iphone} />
          </div>
        </div>

        <div className="flex items-center justify-between bg-black py-4 px-12 ">
          <div className="flex flex-col">
            <div className="flex items-center justify-left gap-3">
              <div>
                <img src={apple} alt="applelogo" className=" " />
              </div>
              <span className="text-white text-md ">iPhone 14 Series</span>
            </div>
            <h1 className="text-white text-5xl capitalize font-bold my-2 text-left leading-[64px]">
              Up to 15% <br />
              off Voucher
            </h1>
            <button className="bg-transparent items-center text-white text-center py-2 px-4 flex gap-3 ">
              <span className="underline">Shop Now</span>
              <ArrowForwardOutlinedIcon className="w-6 h-6" />
            </button>
          </div>

          <div>
            <img src={iphone} />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default RCarousel;
