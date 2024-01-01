import express from "express";
import multer from "multer";
import { CreateSubCategory , ShowSubCategories ,deleteSubCategory,updateSubCategory,ShowSubCategory  } from "../controllers/SubCategory.js";
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

router.post("/create",verifyToken,verifyTokenAndAdmin,upload.single("file"),CreateSubCategory);
router.get("/get", ShowSubCategories);
router.get("/get/:id", ShowSubCategory );
router.patch("/update/:id",verifyToken,verifyTokenAndAdmin,upload.single("file"), updateSubCategory);
router.delete("/delete/:id", verifyToken,verifyTokenAndAdmin,deleteSubCategory );
export default router;