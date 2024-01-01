import express from "express";
import { CreateOrder,GetAllOrders , GetOrder,UpdateOrderStatus ,DeleteOrder } from "../controllers/Order.js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken} from "../middlewares/VerifyAdmin.js"

const router = express.Router();



// POST/create a new Order
router.post('/create' ,verifyToken,verifyTokenAndAuthorization, CreateOrder);
router.get('/showAll', GetAllOrders)
router.get('/show/:Order_ID', GetOrder)
router.patch('/update/:Order_ID', verifyTokenAndAuthorization,UpdateOrderStatus)
router.delete('/update/:Order_ID', verifyTokenAndAuthorization,DeleteOrder )
export default router;
