import express from "express";
import { CreateOrder } from "../controllers/Order.js";

const router = express.Router();



// POST/create a new Order
router.post('/create' , CreateOrder);


export default router;
