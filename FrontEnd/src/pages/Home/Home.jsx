import React, { useEffect, useState } from "react";
import { Title, Button, Promotions } from "@/ui";

import { PRODUCTS } from "@/config/config";
import { ProductCard, Rating } from "@/components/ui";

import Playstation from "@/images/playstation.png";
import Collection from "@/images/collection.png";
import Speakers from "@/images/speakers.png";
import Perfume from "@/images/perfume.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

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

  const getCategory = async () => {
    try {
      const response = await fetch("/");
      const data = await response.json();
      setCategory(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setProducts(PRODUCTS);

    //getProduct()
    //getCategory
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

      <section id="categories" className="c-container py-16 ">
        <Title>Categories</Title>
        <h1 className="font-bold text-xl mt-3">Browse By Category</h1>
      </section>

      <section id="promotion" className="c-container py-16 ">
        <Title>Featured</Title>
        <h1 className="font-bold text-xl mt-3">Promotions</h1>

        <div className="grid grid-cols-2 gap-3">
          <Promotions
            image={Playstation}
            title={"Playstation 5"}
            text={"Black and White version of the PS5 coming out on sale."}
          />

          <div className="grid grid-rows-2 gap-2">
            <Promotions
              image={Collection}
              title={"Women’s Collections"}
              text={"Featured woman collections that give you another vibe."}
            />
            <div className="grid grid-cols-2 gap-2">
              <Promotions
                image={Speakers}
                title={"Speakers"}
                text={"Amazon wireless speakers"}
              />
              <Promotions
                image={Perfume}
                title={"Perfume"}
                text={"GUCCI INTENSE OUD EDP"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
