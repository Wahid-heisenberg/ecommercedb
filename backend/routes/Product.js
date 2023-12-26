import express from "express";
import multer from "multer";
import { CreateProduct, ShowProducts, ShowProduct  , UpdateProduct ,DeleteProduct,ShowProductsByIds} from "../controllers/Product.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
router.get("/getproduct/:id", ShowProduct);///fix this route
router.post("/create", upload.any("files"), CreateProduct);
router.get("/get/:page", ShowProducts).get("/get", ShowProducts)
router.patch("/update/:id/:Category_ID/:Sub_Category_ID", upload.any("files"), UpdateProduct)
router.get("/delete/:id", DeleteProduct);
router.post("/showbyids",ShowProductsByIds);
export default router;
