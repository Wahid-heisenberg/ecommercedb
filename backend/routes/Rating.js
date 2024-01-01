import express from "express";
import { createRating , deleteRating , getAverageRating} from "../controllers/Rating.js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken} from "../middlewares/VerifyAdmin.js"


const router = express.Router();
router.post("/create/:userId/:productId", verifyToken,verifyTokenAndAuthorization,createRating );
router.get("/getAverageRating", getAverageRating );
router.delete("/delete/:id", deleteRating );
export default router;