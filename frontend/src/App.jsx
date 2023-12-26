import React , { useState }from 'react'
import Head from './components/head'
import NavBar from './components/NavBar'
import ProductCart from './components/ProductCart'
import { useEffect } from 'react';
import axios from 'axios';
import Cart from './components/Cart';
import Product from './components/Product';

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
    <div className='m-0 p-0 flex flex-col '>
      <Head />
      <NavBar />
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ProductCart  products={products} />

      </div>
      )} */}

      {/* <Cart/> */}
      <Product related={<ProductCart  products={products} />}/>
    </div>
  );
}

export default App;


