import React from "react";
import Phone from "@/images/sidePhone.png";
import { Button } from "@/ui";
import { Link } from "react-router-dom";

const Login = () => {
  
  return (
    <div className="flex flex-row gap-20">
      <div>
        <img src={Phone} alt="Phone Image" />
      </div>

      <div className="flex flex-col items-start justify-start py-28 gap-4 pl-8">
        <h1 className="font-semibold text-4xl">Log in to Exclusive</h1>
        <p className="font-medium text-sm pb-4">Enter your details below</p>

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

        <div className="flex flex-row justify-between gap-28 items-center pt-4">
        <Button className="w-28">Log in</Button>
        <p className="text-bgButton">Forget password</p>
        </div>
       
      </div>
    </div>
  );
};

export default Login;
