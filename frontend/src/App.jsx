import React , { useState }from 'react'
import Head from './components/head'
import NavBar from './components/NavBar'
import ProductCart from './components/ProductCart'
import { useEffect } from 'react';
import axios from 'axios';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Signup from './pages/signup';
import Home from './pages/Home';
import Footer from './components/footer';
import Signin from './pages/signin';
import Products from './pages/Products';
import { Route, Routes,BrowserRouter } from "react-router-dom";
import ProductDetails from './components/ProductDetails';
function App() {
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
//     <div className='m-0 p-0 flex flex-col '>
//       <Head />
//       <NavBar />
      // {/* {loading ? (
      //   <p>Loading...</p>
      // ) : (
      //   <div>
      //     <ProductCart  products={products} />

      // </div>
      // )} */}

      // {/* <Cart/> */}
      // {/* <Product related={<ProductCart  products={products} />}/> */}
//       {/* <Signup/> */}

// <Home/>
// <Footer/>
//     </div>
<>
<BrowserRouter>
<div className="flex flex-col ">
  <NavBar />

    <div className="p-4 bg-[#f9f9ff]">
      <Routes>
        
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ='/products' element={<Products/>}/>
        <Route path="/home" element={<Home />} />
        <Route path='/product/:product_ID' element={<Product related={<ProductCart  products={products} />}/>}/>
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </div>
    <Footer/>
</div>
</BrowserRouter>
</>
  );
}

export default App;


