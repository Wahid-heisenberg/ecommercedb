import React from 'react'

import ReactStars from 'react-rating-stars-component';

function StarsRating({ rating }) {
  return (
    <ReactStars
      count={5}
      value={rating}
      edit={false}
      size={24}
      activeColor="#ffd700"
    />
  );
}

export default StarsRating
