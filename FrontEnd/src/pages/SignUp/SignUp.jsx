import React from "react";
import Phone from "@/images/sidePhone.png";
import { Button } from "@/ui";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-row gap-20">
      <div>
        <img src={Phone} alt="Phone Image" />
      </div>

      <div className="flex flex-col items-start justify-start py-28 gap-4 pl-8">
        <h1 className="font-semibold text-4xl">Create an account</h1>
        <p className="font-medium text-sm pb-4">Enter your details below</p>
        <input
          type="text"
          className="outline-none border-b-2 w-full py-2 "
          placeholder="Name"
        />
        <input
          type="text"
          className="outline-none border-b-2 w-full py-2 "
          placeholder="Email or Phone Number"
        />
        <input
          type="password"
          className="outline-none border-b-2 w-full py-2 "
          placeholder="Password"
        />

        <Button className="w-full" >Create Account</Button>
        <div className="flex items-center justify-center gap-2 pl-4">
            <p>Already have an account?</p>
            <Link to="/logIn" className="">
            <h1 className="text-blackPrimary font-bold">Log In</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
