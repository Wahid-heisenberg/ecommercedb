import express from "express";
import { CreateOrder,GetAllOrders , GetOrder,UpdateOrderStatus ,DeleteOrder } from "../controllers/Order.js";

const router = express.Router();



// POST/create a new Order
router.post('/create' , CreateOrder);
router.get('/showAll', GetAllOrders)
router.get('/show/:Order_ID', GetOrder)
router.patch('/update/:Order_ID', UpdateOrderStatus)
router.delete('/update/:Order_ID', DeleteOrder )
export default router;
