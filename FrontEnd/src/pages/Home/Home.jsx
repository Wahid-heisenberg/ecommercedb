import React, { useEffect, useState } from "react";
import { Title, Button } from "@/ui";

import { PRODUCTS } from "@/config/config";
import { ProductCard, Rating } from "@/components/ui";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const response = await fetch("");
      if ((response.status = 200)) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setProducts(PRODUCTS);

    //getProduct()
  }, []);

  return (
    <>
      <main className="relative ">
        <div className="c-container pt-16 pb-8">
          <div className="bg-black block h-60 "></div>
        </div>
      </main>

      <section>
        <div className="c-container py-16">
          <Title>Today's</Title>
          <h1 className="font-bold text-xl mt-3">New products</h1>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5 ">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button>View All Products</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
