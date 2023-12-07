import { db } from "../db.js";
import dotenv from "dotenv";
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

export const ShowCategories = (req, res) => {
  try {

    const q = "SELECT * FROM Categories";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(200).json("There is no Categories!");

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
}

export const updateCategory = (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.Name|| !req.body.Image)
      return res.status(400).json("Please provide name and image.");

    //Check if Category exists
    const q = "SELECT * FROM Categories WHERE  Category_ID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(409).json("Category not found!");

        const q = "UPDATE Categories SET Name = ?, Description = ?, Image = ? WHERE Category_ID = ?";
        const values = [req.body.Name, req.body.Description, req.body.Image , req.params.id];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json("Database error :<br/>" + err);
            return res.status(200).json("Category has been updated.");
            }
        );
    }
    );
    } catch (error) {
    console.log(error);
    }
}

export const deleteCategory = (req, res) => {
  try {
    console.log(req.body);

    //Check if Category exists
    const q = "SELECT * FROM Categories WHERE  Category_ID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(409).json("Category not found!");

        const q = "DELETE FROM Categories WHERE Category_ID = ?";

        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json("Database error :<br/>" + err);
            return res.status(200).json("Category has been deleted.");
            }
        );
    }
    );
    } catch (error) {
    console.log(error);
    }
}