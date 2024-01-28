import React from 'react'
import StarsRating from "./StarsRating";
import Navette from "../assets/Navette";
import Return from "../assets/Return";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
function ProductDetails({ product,id, quantity, handleIncreaseQuantity, handleDecreaseQuantity}) {
console.log(product)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(2);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleBuyNow = async () => {
    try {
      // Retrieve client ID from local storage
      const clientID = localStorage.getItem('Client_ID');
      // Check if client ID is available
      if (!clientID) {
        console.error('Client ID not found in local storage');
      }

      // Create order object
      const order = {
        Client_ID: 5,
        Order_Products: [
          {
            Product_ID:  Number(id) ,
            Quantity: quantity,
          }
        ]
      };

      setLoading(true); 
      // Send the order to the server (you may want to handle this asynchronously)
      const response = await axios.post('http://localhost:5000/api/order/create', order);

    toast.success('order created successfully')
      // Add any additional logic after placing the order
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('error when creating order')

    } finally {
      setLoading(false);
    }
  };
  const handleRate = async(event) => {
    event.preventDefault();
  
    // Get the values from the form
    const title = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
  
    // Validate the form data
    if (!title || !comment || !rating) {
      toast.info('fill all the fields to rate ')
    }
   const rate = {
      Stars_Number: rating,
      User_Comment: comment
    }
    console.log(rating)
    const response = await axios.post(`http://localhost:5000/api/Rating/create/2/${id}`, rate);

    toast.success('rated seccusfully')
    // Close the dialog
    handleClose();
  };
  return (
    <div className="product-details">
    <h2 className="text-xl font-bold mb-2">{product.Name}</h2>
    
    <StarsRating
      rating={product.AverageStars}
      scale="scale-150  translate-x-[114px]"
    />
    <div className="mt-4">
      <span className="text-gray-500 line-through mr-2  text-2xl">
        {product.OldPrice} DA
      </span>
      <span className="text-green-500 font-bold text-2xl">
        {product.Price} DA
      </span>
    </div>
    <p className="text-black text-lg mb-4">{product.Description}</p>
    <hr className="border-t-2 border-black mt-4 mb-4 opacity-30" />
    <div className="flex items-center justify-between gap-16  ">
      <div className="border flex justify-between  items-center   w-24 ">
        <button
          className="bg-white border text-gray-700 px-2 py-1 rounded w-8"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          className="bg-[#DB4444] text-white px-2 py-1 rounded w-8"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
      <ToastContainer/>
      <button
                onClick={handleBuyNow}
                disabled={loading}
      className="bg-[#DB4444] text-white px-4 py-2 rounded mb-8 w-40 ">
        Buy Now
      </button>
    </div>
    <butoon onClick={handleClickOpen}  className="bg-[#DB4444] cursor-pointer text-white px-4 py-2 rounded w-40 ">
Rate this product
    </butoon>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Donner ton avis</DialogTitle>
        <DialogContent>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={handleRatingChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleRate} color="primary">
      Submit
    </Button>
  </DialogActions>
      </Dialog>

    <div className="flex flex-col mt-8 ">
      <div className="py-2 px-4 border border-b-0 flex gap-4 items-center">
        <Navette />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Delivery</h1>
          <h4 className="text-base">
            Enter your postal code for Delivery Availability
          </h4>
        </div>
      </div>
      <div className="py-2 px-4 border flex gap-4 items-center">
        <Return />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Return Delivery</h1>
          <h4 className="text-base">
          Free 30 Days Delivery Returns. Details
          </h4>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductDetails