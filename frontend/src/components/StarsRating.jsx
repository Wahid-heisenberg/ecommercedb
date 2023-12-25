import React from "react";

const StarsRating = ({ rating }) => {
  const starPath =
    "M10 15.27L16.18 21l-1.64-7.03L22 9.24l-7.19-.61L10 2 7.19 8.63 0 9.24l5.46 4.73L3.82 21z";
  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-yellow-500 fill-current"
      viewBox="0 0 24 24"
    >
      <path d={starPath} />
    </svg>
  ));

  const halfStar =
    rating % 1 !== 0 ? (
      <svg
        key="half"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-yellow-500 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h12v24H0z" clipPath="url(#a)" />
        <path d={starPath} />
      </svg>
    ) : null;

  const emptyStars = Array.from(
    { length: 5 - Math.ceil(rating) },
    (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-gray-300 fill-current"
        viewBox="0 0 24 24"
      >
        <path d={starPath} />
      </svg>
    )
  );

  return (
    <div className="flex items-center">
      {filledStars}
      {halfStar}
      {emptyStars}
    </div>
  );
};

export default StarsRating;
