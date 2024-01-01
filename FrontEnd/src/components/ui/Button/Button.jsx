import React from "react";

const Button = ({ children, className, ...props }) => {
  return <button className={`${className} bg-bgButton text-white flex items-center justify-center py-3 rounded-md `}>{children}</button>;
};

export default Button;
