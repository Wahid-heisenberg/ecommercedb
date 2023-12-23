import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();
import { organizeProducts } from "../helpers/OrganizeProducts.js";

export const CreateProduct = async (req, res) => {
  try {
    if (
      !req.body.Name ||
      !req.body.Price ||
      !req.query.Category_ID ||
      !req.query.Sub_Category_ID
    ) {
      return res.status(400).json("Please provide All required credentiels.");
    }

    // Check if Category exists
    const checkProductyQuery = "SELECT * FROM Products WHERE Name = ?";

    db.query(checkProductyQuery, [req.body.Name], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length > 0) {
        return res.status(409).json("Product already exists!");
      }
      console.log(req.files)

      // Extract the file path
      // const imagePath = req.file.path;
      // Insert the new category with the image path
      const createProductQuery =
        "INSERT INTO Products(`Name`, `Description`, `Price`,`Category_ID`, `Sub_Category_ID`) VALUES (?, ?, ? ,? , ?) ";
      const values = [
        req.body.Name,
        req.body.Description,
        req.body.Price,
        req.query.Category_ID,
        req.query.Sub_Category_ID,
      ];

      db.query(createProductQuery, values, (err, data) => {
        if (err) {
          return res.status(500).json("Database error: " + err);
        }
        const productId = data.insertId;

        const createProductImageQuery = "INSERT INTO Product_Images (Product_ID, Image_URL) VALUES (?, ?)";
        const images = req.files;
        let imagesInserted = 0;

        for (let i = 0; i < images.length; i++) {
          images[i] = [productId, images[i].path];
          db.query(createProductImageQuery, images[i], (err, data) => {
            if (err) {
              console.error("Database error: " + err);
            }
            imagesInserted++;
            if (imagesInserted === images.length) {
              console.log(imagesInserted + " images have been inserted");
              return res.status(200).json("Product has been created.");
            }
          });
        
        }

        
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error.");
  }
};

export const ShowProducts = (req, res) => {
  try {
    console.log(req.query.page);
    const page = req.query.page || 1; // Default to page 1 if not specified
    const itemsPerPage = 8;

    const offset = (page - 1) * itemsPerPage;

    const q =
      "SELECT * FROM Products join Product_Images on Products.ProductID = Product_Images.Product_ID LIMIT ?, ?  ";
    const values = [offset, itemsPerPage];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json("Database error: " + err);
      }

      if (data.length === 0) {
        return res.status(200).json("There are no products on this page.");
      }

      return res.status(200).json({
        page: page,
        products: organizeProducts(data),
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};


export const ShowProduct = (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json("Please provide the required product.");
    }
    const q = "SELECT * FROM Products JOIN Product_Images ON Products.ProductID = Product_Images.Product_ID WHERE Products.ProductID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0)
        return res.status(200).json("There is no Product!");

      return res.status(200).json(organizeProducts(data));
    });
  } catch (error) {
    console.log(error);
  }
};


