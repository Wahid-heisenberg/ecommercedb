import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(455);
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    // Get cart ids from local storage
    const storedCartIds = localStorage.getItem("cart");
    if (storedCartIds) {
      setCartIds(JSON.parse(storedCartIds));
    }
  }, []);

  useEffect(() => {
    if (cartIds.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/product/showbyids",
            {
              ids: cartIds,
            }
          );
          const items = await Promise.all(
            response.data.map(async (item) => {
              return { ...item, quantity: 1 };
            })
          );
          setCartItems(items);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [cartIds]);
  // Function to update the quantity of a product in the cart
  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    const updatedCartItems = cartItems.map((item) => {
      if (item.product_ID === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.Price * item.quantity;
    });
    return totalPrice;
  };


  const [loadingp, setLoadingp] = useState(false);

  const handleBuyNow = async () => {
    try {
      // Retrieve client ID from local storage
      const clientID = localStorage.getItem('Client_ID');

      // Check if client ID is available
      if (!clientID) {
        console.error('Client ID not found in local storage');
      }

      const orderProducts = cartItems.map(item => ({
        Product_ID: item.product_ID,
        Quantity: item.quantity,
      }));
      const order = {
        Client_ID: 5,
        Order_Products:orderProducts
      };
      // console.log(cartItems)
console.log(order)
      setLoadingp(true); 
      // Send the order to the server (you may want to handle this asynchronously)
      const response = await axios.post('http://localhost:5000/api/order/create', order);

    toast.success('order created successfully')
      // Add any additional logic after placing the order
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('error when creating order')

    } finally {
      setLoadingp(false);
    }
  };


  return (
    <div  className="container mx-auto px-36 my-8">
      <h1>
        {" "}
        <span className="text-md opacity-50 font-semibold ">Home/</span>{" "}
        <span className="text-black opacity-115 font-semibold text-md ">
          {" "}
          Cart
        </span>
      </h1>
      {cartItems.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left  ">Price</th>
              <th className="px-4 py-2 text-left ">Quantity</th>
              <th className="px-4 py-2 text-left ">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product_ID}>
                <td className=" flex px-4 py-2 gap-2">
                  <img
                    className="w-16 h-8"
                    src={item.Images[0].Image_URL.slice(18)}
                    alt=""
                  />{" "}
                  <span>{item.product_Name}</span>
                </td>
                <td className=" px-4 py-2">{item.Price} DA</td>
                <td className=" px-4 py-2">
                  <input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(item.product_ID, e.target.value)
                    }
                    className="w-16 border-2 text-center"
                  />
                </td>
                <td className=" px-4 py-2">
                  {item.Price * item.quantity || item.Price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div className="p-16 flex items-center justify-center">
            <h1 className="text-center font-bold text-xl ">
              No Products in the Cart
            </h1>
          </div>
        </>
      )}

      <Link
        to="/products"
        className="block mt-4 text-black font-semibold p-2 border-[1px] border-black w-1/5 text-center"
      >
        Return to Shop
      </Link>
      {cartItems.length > 0 &&
<>
      <div className="flex  justify-between ">
        <div className="flex items-center justify-between gap-1 ">
          <input
            type="text"
            name="coupon"
            className="p-2 focus:outline-0 border-[1px] border-black"
          />
          <button className="text-center text-white font-semibold bg-[#DB4444] p-2 border-[1px] border-[#DB4444] text-base">
            Apply Coupon
          </button>
        </div>
        <div className=" border-[1px] border-black p-4  w-96 flex flex-col  justify-center">
          <h3 className="text-lg font-bold">Cart Total</h3>

          <p className="mb-2 flex justify-between">
            <span>Subtotal: </span> <span>{calculateTotalPrice() || 0} DA</span>{" "}
          </p>
          <hr className=" opacity-40 w-full border-black border-[1px]" />
          <p className="mb-2 flex justify-between">
            <span>Shipping:</span> <span>{deliveryPrice} DA</span>{" "}
          </p>
          <hr className=" opacity-40 w-full  border-black border-[1px]" />
          <p className="font-bold flex justify-between">
            <span>Total:</span>{" "}
            <span>{calculateTotalPrice() + deliveryPrice} DA</span>
          </p>
          <ToastContainer/>
          <button
                          onClick={handleBuyNow}
                          disabled={loadingp}
          className="mt-4 text-center mx-16  text-white font-semibold bg-[#DB4444] p-2 border-[1px] border-[#DB4444] text-base">
            Procees to checkout
          </button>
        </div>
      </div>
      </>}
    </div>
   
  );
};

export default Cart;
