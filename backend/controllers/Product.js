import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export const CreateProduct = (req, res) => {
    try {
      if (!req.body.Name || !req.body.Price || !req.body.Category_ID || !req.body.Sub_Category_ID) {
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
  
        // Extract the file path
        // const imagePath = req.file.path;
  
        // Insert the new category with the image path
        const createProductQuery =
          "INSERT INTO Products(`Name`, `Description`, `Price`,`Category_ID`, `Sub_Category_ID`) VALUES (?, ?, ? ,? , ?)";
        const values = [req.body.Name, req.body.Description, req.body.Price , req.body.Category_ID ,req.body.Sub_Category_ID];
  
        db.query(createProductQuery, values, (err, data) => {
          if (err) {
            return res.status(500).json("Database error: " + err);
          }
          return res.status(200).json("Product has been created.");
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error.");
    }
  };
  

  export const ShowProducts = (req, res) => {
    try {
      const page = req.query.page || 1; // Default to page 1 if not specified
      const itemsPerPage = 8;
  
      const offset = (page - 1) * itemsPerPage;
  
      const q = "SELECT * FROM Products LIMIT ?, ?";
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
          products: data,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  };
  

