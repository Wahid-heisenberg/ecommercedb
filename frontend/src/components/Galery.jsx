import React from 'react'

function Galery({product, activeImage, setActiveImage}) {
  return (
    <div className="flex gap-5  justify-center">
    <div className="flex flex-col gap-3 ">
      {" "}
      {product.images.map((image, index) => (
        <button
          className={`rounded-md cursor-pointer ${
            activeImage === index ? "border-black border" : ""
          }`}
          onClick={() => setActiveImage(index)}
        >
          <img
            className=" h-40 w-40 bg-[#F5F5F5] rounded-md"
            key={image.Image_ID}
            src={image.Image_URL.slice(18)}
            alt="Product"
          />
        </button>
      ))}
    </div>
    <div className="bg-[#F5F5F5] rounded-md ">
      <img
        src={product.images[activeImage].Image_URL.slice(18)}
        alt="Product"
        className="rounded-md"
      />
    </div>
  </div>
  )
}

export default Galery