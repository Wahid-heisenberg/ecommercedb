import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchIcon from "@/assets/svg/searchIcon.svg?react";
import Favorite from "@/assets/svg/Wishlist.svg?react";
import Cart from "@/assets/svg/cart.svg?react";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "contact" },
    { name: "About", path: "about" },
    { name: "Sign Up", path: "sign up" },
  ];
  const location = useLocation().pathname;
  console.log(location);

  return (
    <>
      <header className="border-b-2 border-grayText py-4">
        <div className="c-container flex flex-row items-center justify-between gap-4">
          <Link to="/" className="">
            <h1 className="text-blackPrimary font-bold">Exclusive</h1>
          </Link>

          <nav className="">
            <ul className="flex flex-row items-center justify-between gap-10 ">
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-blackPrimary font-medium"
                        : isActive
                        ? "border-b-2 border-red-400"
                        : ""
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {location !== "/login" ? (
            <div className="flex gap-4">
              <div className="flex relative">
                <input
                  type="text "
                  className="bg-input w-60 pl-3 pr-10 h-9 rounded-md outline-none text-[13px]"
                  placeholder="What are you looking for?"
                />
                <SearchIcon className="absolute h-9 p-0.5 right-2 cursor-pointer" />
              </div>

              <button>
                <Favorite className="stroke-black hover:stroke-red-500" />
              </button>

              <button>
                <Cart className="stroke-black hover:stroke-red-500" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
