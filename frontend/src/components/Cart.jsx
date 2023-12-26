import React, { useState, useEffect } from "react";
import axios from "axios";
const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
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
          setCartItems(response.data);
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

  return (
    <div className="container mx-auto my-8">
      <h1>
        {" "}
        <span className="text-md opacity-50 font-semibold ">Home/</span>{" "}
        <span className="text-black opacity-115 font-semibold text-md ">
          {" "}
          Cart
        </span>
      </h1>
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

      <a
        href="/shop"
        className="block mt-4 text-black font-semibold p-2 border-[1px] border-black w-1/5 text-center"
      >
        Return to Shop
      </a>
      <div className="flex items-center justify-between ">
        <div className="flex items-center justify-between gap-1">
          <input
            type="text"
            name="coupon"
            className="p-2 focus:outline-0 border-[1px] border-black"
          />
          <button className="text-center text-white font-semibold bg-[#DB4444] p-2 border-[1px] border-[#DB4444] text-base">
            Apply Coupon
          </button>
        </div>
        <div className=" border-[1px] border-black p-4 ">
          <h3 className="text-lg font-bold">Cart Total</h3>

          <p className="mb-2 flex justify-between">
            <span>Subtotal: </span> <span>{calculateTotalPrice() || 0} DA</span>{" "}
          </p>
          <hr className=" opacity-40 w-full border-black border-[1px]" />
          <p className="mb-2 flex justify-between">
            <span>Shipping:</span> <span>{deliveryPrice || 0} DA</span>{" "}
          </p>
          <hr className=" opacity-40 w-full  border-black border-[1px]" />
          <p className="font-bold flex justify-between">
            <span>Total:</span>{" "}
            <span>{calculateTotalPrice() + deliveryPrice || 0} DA</span>
          </p>
          <button className="mt-4 text-center  text-white font-semibold bg-[#DB4444] p-2 border-[1px] border-[#DB4444] text-base">
            Procees to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
