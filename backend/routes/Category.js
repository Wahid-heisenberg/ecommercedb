import express from "express";
import multer from "multer";
import { CreateCategory, ShowCategories, ShowCategory , updateCategory, deleteCategory ,ShowCategoriesWithDetails } from "../controllers/Category.js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken} from "../middlewares/VerifyAdmin.js"
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

router.post("/create",verifyToken,verifyTokenAndAdmin,upload.single("file"),CreateCategory);
router.get("/get", ShowCategories);
router.get("/getDetailled", ShowCategoriesWithDetails);
router.get("/get/:id", ShowCategory );
router.patch("/update/:id",verifyToken,verifyTokenAndAdmin,upload.single("file"), updateCategory);
router.delete("/delete/:id", verifyToken,verifyTokenAndAdmin,deleteCategory);
export default router;