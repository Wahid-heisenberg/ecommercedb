import express from "express";
import multer from "multer";
import { CreateProduct , ShowProducts } from "../controllers/Product.js"; 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/public/images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"--"+ file.originalname);
    },
  });
  const upload = multer({ storage });

const router = express.Router();
router.post("/create",upload.single("file"), CreateProduct);
router.get("/get", ShowProducts);
export default router