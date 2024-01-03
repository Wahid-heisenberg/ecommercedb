import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "@/config/config";



const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCategories(CATEGORIES);
    // getCategories();
  }, []);

  

  return (
    <div className="grid grid-cols-6 gap-8 mt-5">
      {categories.map((category, index) => (
        <Link
        to={`/boutique?category=${category.Category_ID}`}
      
          key={index}
          className="flex flex-col hover:bg-bgButton group items-center justify-center p-6 gap-2 border-2 rounded-lg group-hover:border-bgButton cursor-pointer  "
        >
          <category.Image className="stroke-black group-hover:stroke-white" />
          <span className="text-black group-hover:text-white  ">
            {" "}
            {category.Name}{" "}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
