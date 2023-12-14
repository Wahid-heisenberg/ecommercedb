import { db } from "../db.js";
import dotenv from "dotenv";
import { organizeCategories } from "../helpers/organizeCategories.js";
import { checkCategoryExistence ,updateCategoryInDatabase } from "../helpers/Category.js";
dotenv.config();

export const CreateCategory = (req, res) => {
  try {
    if (!req.body.Name || !req.file) {
      return res.status(400).json("Please provide name and image.");
    }

    // Check if Category exists
    const checkCategoryQuery = "SELECT * FROM Categories WHERE Name = ?";

    db.query(checkCategoryQuery, [req.body.Name], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length > 0) {
        return res.status(409).json("Category already exists!");
      }

      // Extract the file path
      const imagePath = req.file.path;

      // Insert the new category with the image path
      const createCategoryQuery =
        "INSERT INTO Categories(`Name`, `Description`, `Image`) VALUES (?, ?, ?)";
      const values = [req.body.Name, req.body.Description, imagePath];

      db.query(createCategoryQuery, values, (err, data) => {
        if (err) {
          return res.status(500).json("Database error: " + err);
        }
        return res.status(200).json("Category has been created.");
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error.");
  }
};


export const ShowCategoriesWithDetails = (req, res) => {
  try {
    const q = `SELECT c.Category_ID AS Category_ID, c.Name AS Category_Name, c.Description AS Description, c.Image AS Category_Image, sc.Sub_Category_ID, sc.Name, sc.Description AS Sub_Category_Description  , sc.Image AS Sub_Category_Image  , c.Category_ID AS Mother_Category FROM Categories c LEFT JOIN sub_categories sc ON c.Category_ID = sc.Mother_Category ORDER BY c.Category_ID, sc.Sub_Category_ID;`;
  

  
  

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0)
        return res.status(200).json("There is no Categories!");

      return res.status(200).json(organizeCategories(data));
    });
  } catch (error) {
    console.log(error);
  }
};
export const ShowCategories = (req, res) => {
  try {
    const q = `SELECT * FROM categories `;
  

  
  

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0)
        return res.status(200).json("There is no Categories!");

      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const ShowCategory = (req, res) => {
  try {
    const q = "SELECT * FROM Categories WHERE Category_ID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(200).json("Category not found!");

      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};


export const updateCategory = (req, res) => {
  try {
    // Validate request parameters
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json("Please choose a category");
    }

    // Check if Category exists
    checkCategoryExistence(categoryId, res, (data) => {
      // Category exists, proceed with the update
      const updateFields = {};
      if (req.body.Name) {
        updateFields.Name = req.body.Name;
      }
      if (req.body.Description) {
        updateFields.Description = req.body.Description;
      }
      if (req.file) {
        updateFields.Image = req.file.path;
      }

      // If no fields to update are provided
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json("No fields provided for update");
      }

      // Update category in the database
      updateCategoryInDatabase(categoryId, updateFields, res);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};



export const deleteCategory = (req, res) => {
  try {

    //Check if Category exists
    const q = "SELECT * FROM Categories WHERE  Category_ID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(409).json("Category not found!");

      const q = "DELETE FROM Categories WHERE Category_ID = ?";

      db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json("Database error :<br/>" + err);
        return res.status(200).json("Category has been deleted.");
      });
    });
  } catch (error) {
    console.log(error);
  }
};



export const deleteALLCategories = (req, res) => {
  try {
    const q = "DELETE FROM Categories";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json("Database error: " + err);
      return res.status(200).json("All categories have been deleted.");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};
