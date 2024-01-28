import React from "react";
import Carousel from "../components/Carousel";
import Title from "../components/Title";
import ProductCart from "../components/ProductCart";
import axios from "axios";
import CategoryCart from "../components/CategoryCart";
import { useState, useEffect } from "react";
import tech from "../assets/tech.png";
import { Link } from "react-router-dom";
import Offers from "../components/Offers";
import PromotionsGrid from "../components/PromotionsGrid";
import Footer from "../components/footer";
function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/get/?page=1"
        );
        setProducts(response.data.products);
        setPage(response.data.page);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const apiCategories = 'http://localhost:5000/api/category/getDetailled';
  const [categoroies, setCategoroies] = useState([]);
axios.get(apiCategories)
  .then(response => {
    setCategoroies(response.data)
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });


  return (
    <div className="px-44 py-8">
      <div>
        <Carousel />
      </div>
      <Title title="Today's" />
      <h1 className="mt-3 font-bold text-3xl">New products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ProductCart products={products} />
        </div>
      )}

      <div className=" flex items-center justify-center ">
        <Link
        to='/products'
        className="text-center border px-3 py-2 bg-[#DB4444] text-white font-semibold  ">
          View All Products
        </Link>
      </div>
      <Title title="Categories" />
      <h1 className="mt-3 font-bold text-3xl mb-6">Browse by category</h1>
      <div className="flex flex-wrap gap-4 items-center justify-center my-6">
      {categoroies.map(category => (
          <CategoryCart
            key={category.Category_ID}
            image={category.Category_Image.slice(18)}
            name={category.Category_Name}
          />
        ))}
      </div>
      <Title title="Featured" />
      <h1 className="mt-3 font-bold text-3xl mb-6">Promotions</h1>
      <PromotionsGrid />
      <Offers />
    </div>
  );
}

export default Home;
