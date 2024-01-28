import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import Galery from "../components/Galery";
import ProductDetails from "../components/ProductDetails";
import { useParams } from 'react-router-dom';

const Product = ({related}) => {

  const location = useParams();
const currentRoute = location.product_ID;
console.log(currentRoute)

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/getproduct/${currentRoute}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  console.log(product);

  return (
    <div className="flex flex-col px-32 py-16">
    <div className="flex gap-28  ">
      {product && (
        <>
<Galery product={product} activeImage={activeImage} setActiveImage={setActiveImage}/>
 <ProductDetails product={product} id={currentRoute} quantity={quantity} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity}/>
        </>
      )}
    </div>
<Title title='Related items'/>
    {related}
    </div>
  );
};

export default Product;
