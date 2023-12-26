import React from "react";
import SearchIcon from "../assets/SearchIcon";
import HeartIcon from "../assets/HeartIcon";
import ProfileIcon from "../assets/ProfileIcon";
import CartIcon from "../assets/CartIcon";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
const NavBar = () => {
  const CartItems = JSON.parse(localStorage.getItem("cart")).length
  return (
    <nav className="bg-white border-black border-[1px] border-opacity-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-black font-bold text-lg">Exclusive</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="text-black  hover:font-bold  px-3 py-2  text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-black  hover:font-bold  px-3 py-2  text-sm font-medium"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-black  hover:font-bold  px-3 py-2  text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-black  hover:font-bold  px-3 py-2  text-sm font-medium"
              >
                Sign Up
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 ">
            <div className="flex items-center justify-between  bg-[#F5F5F5] px-4 py-1">
              <input
                className="border-0 focus:outline-none bg-transparent text-sm"
                type="search"
                name="Search"
                placeholder="What are you looking for?"
              />
              <SearchIcon />
            </div>
            <div className="flex  justify-between gap-4 ">
              <div className="flex items-center justify-between relative">
                <HeartIcon className="w-6 h-6 " />
                <div className="absolute top-[-2px] right-[-6px] bg-[#DB4444] rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
              </div>
              <div className="flex items-center justify-between relative">
                <CartIcon className="w-6 h-6 " />
                { CartItems &&
                <div className="absolute top-[-2px] right-[-6px] bg-[#DB4444] rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">
                { CartItems }
                </div>
                }
              </div>
              <div className="flex items-center justify-between relative">
                <ProfileIcon className="w-6 h-6 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
