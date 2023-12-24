import express from "express";
import { createRating , deleteRating , getAverageRating} from "../controllers/Rating.js";


const router = express.Router();
router.post("/create/:userId/:productId", createRating );
router.get("/getAverageRating", getAverageRating );
router.delete("/delete/:id", deleteRating );
export default router;