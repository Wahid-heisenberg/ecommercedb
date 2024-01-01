import express from "express";
import multer from "multer";
import { CreateProduct, ShowProducts, ShowProduct  , UpdateProduct ,DeleteProduct} from "../controllers/Product.js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken} from "../middlewares/VerifyAdmin.js"

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
router.post("/create", verifyToken,verifyTokenAndAdmin,upload.any("files"), CreateProduct);
router.get("/get/:page", ShowProducts).get("/get", ShowProducts)
router.patch("/update/:id/:Category_ID/:Sub_Category_ID", verifyToken,verifyTokenAndAdmin,upload.any("files"), UpdateProduct)
router.get("/delete/:id", verifyToken,verifyTokenAndAdmin,DeleteProduct);

export default router;
