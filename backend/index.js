import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/Category.js";
import SubCategoryRoutes from "./routes/SubCategory.js";
import ProductRoutes from "./routes/Product.js";
import OrderRoutes from './routes/Order.js'
import RatingRoutes from './routes/Rating.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/SubCategory", SubCategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use ("/api/order",OrderRoutes)
app.use ("/api/Rating",RatingRoutes)
const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  } else
   console.log("Connected to MySQL successfully");
});

app.listen(PORT, () => {
  console.log("backend application is  rinning on port " + PORT);
});
