import { db } from "../db.js";

export const checkSubCategoryExistence = (SubCategoryID, res, callback) => {
    const query = "SELECT * FROM Sub_Categories WHERE  Sub_Category_ID = ?";
    db.query(query, [SubCategoryID], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      if (data.length === 0) {
        return res.status(409).json("SubCategory not found!");
      }
  
      // Callback with the category data if it exists
      callback(data);
    });
  };
  export const updateSubCategoryInDatabase = (SubCategoryID, updateFields, res) => {
    const setClause = Object.keys(updateFields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(updateFields);
    
    const query = `UPDATE Sub_Categories SET ${setClause} WHERE Sub_Category_ID = ?`;
    values.push(SubCategoryID);
  
    db.query(query, values, (err, data) => {
      if (err) {
        return res.status(500).json("Database error: " + err);
      }
  
      return res.status(200).json("SubCategory has been updated.");
    });
  };