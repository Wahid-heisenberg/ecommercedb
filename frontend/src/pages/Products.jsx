import React from 'react'
import ProductCart from '../components/ProductCart';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function Products() {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
      const fetchData = async () => {
        try {
            setLoading(true)
          const response = await axios.get('http://localhost:5000/api/product/get/?page=1');
          setProducts(response.data.products);
          setPage(response.data.page)
          setLoading(false);
        
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <>
    {loading ? 
          <p>Loading...</p>
        : 
          <div>
            <ProductCart  products={products} />
  
        </div>
        }
        </>
  )

}

export default Products