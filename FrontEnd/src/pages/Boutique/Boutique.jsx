import React, { useState } from "react";
import { Title, ProductCard } from "@/ui";
import { CATEGORIES, PRODUCTS } from "@/config/config";
import { useNavigate } from "react-router-dom";

const Boutique = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const idCategory = queryParameters.get("category");
  const category = CATEGORIES.find(
    (i) => Number(i.Category_ID) === Number(idCategory)
  );

  return (
    <main>
      <div className="c-container py-16">
        <Title>{category ? category.Name : "Boutique"}</Title>
        <h1 className="font-bold text-xl mt-3">Browse By Category</h1>

        <div className="flex gap-5 flex-wrap mt-5">
          <div
            onClick={() => {
              navigate(`/boutique`);
            }}
            className={`${
              !idCategory ? "text-bgButton" : "text-black"
            } font-bold hover:underline transition-all duration-300 ease-out cursor-pointer`}
          >
            All
          </div>

          {CATEGORIES.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/boutique?category=${item.Category_ID}`);
              }}
              key={index}
              className={`${
                Number(idCategory) === Number(item.Category_ID)
                  ? "text-bgButton"
                  : "text-black"
              } font-bold hover:underline transition-all duration-300 ease-out cursor-pointer`}
            >
              {item.Name}
            </div>
          ))}
        </div>

        {PRODUCTS.filter((item) => {
          if (idCategory) { // if we use filter or not
            return Number(item.Id_category) === Number(idCategory);
          }
          return item;
        }).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
            {PRODUCTS.filter((item) => {
              if (idCategory) {
                return Number(item.Id_category) === Number(idCategory);
              }
              return item;
            }).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-5 bg-slate-100 rounded-lg flex justify-center items-center text-slate-800 font-bold text-xl p-10">
            There is no result
          </div>
        )}
      </div>
    </main>
  );
};

export default Boutique;
