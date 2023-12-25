import React from "react";

function HeartIcon({ className , stroke }) {
  return (
    <div >
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    >
      <path
        d="M6 1C3.239 1 1 3.23669 1 5.99621C1 8.22381 1.875 13.5107 10.488 18.8551C10.6423 18.9499 10.8194 19 11 19C11.1806 19 11.3577 18.9499 11.512 18.8551C20.125 13.5107 21 8.22381 21 5.99621C21 3.23669 18.761 1 16 1C13.239 1 11 4.028 11 4.028C11 4.028 8.761 1 6 1Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        />
    </svg>
        </div>
  );
}

export default HeartIcon;
