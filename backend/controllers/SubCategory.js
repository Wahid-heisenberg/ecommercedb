import { db } from "../db.js";
import dotenv from "dotenv";
import { checkSubCategoryExistence ,updateSubCategoryInDatabase } from "../helpers/SubCAtegory.js";
dotenv.config();


export const CreateSubCategory = (req, res) => {
  try {
    if (!req.body.Name || !req.file ,!req.body.ParentCategory) {
      return res.status(400).json("Please provide name and image and parent category.");
    } 

    // Check if Category exists
    const checkCategoryQuery = "SELECT * FROM Categories WHERE Category_ID  = ?";

    db.query(checkCategoryQuery, [req.body.ParentCategory], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!data.length) {
        return res.status(409).json(" parent Category does not exist exists!");
      }

      // Extract the file path
      const imagePath = req.file.path;

      // Insert the new category with the image path
      const createCategoryQuery =
        "INSERT INTO sub_categories(`Name`, `Description`, `Image`,`Mother_Category`) VALUES (?, ?, ?,?)";
      const values = [req.body.Name, req.body.Description, imagePath ,req.body.ParentCategory];

      db.query(createCategoryQuery, values, (err, data) => {
        if (err) {
          return res.status(500).json("Database error: " + err);
        }
        return res.status(200).json("Sub_Category has been created.");
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error.");
  }
};

export const ShowSubCategories = (req, res) => {
  try {

    const q = "SELECT * FROM sub_categories";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(200).json("There is no Categories!");

      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const ShowSubCategory = (req, res) => {
  try {

    const q = "SELECT * FROM sub_categories WHERE Sub_Category_ID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(200).json("Sub_Category_ID	not found!");

      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
}


export const updateSubCategory = (req, res) => {
  try {
    // Validate request parameters
    const subCategoryId = req.params.id;
    if (!subCategoryId) {
      return res.status(400).json("Please choose a sub-category");
    }

    // Check if Sub-Category exists
    checkSubCategoryExistence(subCategoryId, res, () => {
      // Sub-Category exists, proceed with the update
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

      // Update sub-category in the database
      updateSubCategoryInDatabase(subCategoryId, updateFields, res);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};


export const deleteSubCategory = (req, res) => {
  try {
    console.log(req.body);

    //Check if Category exists
    const q = "SELECT * FROM Categories WHERE  sub_category_ID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(409).json("Category not found!");

        const q = "DELETE FROM Categories WHERE sub_category_ID = ?";

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