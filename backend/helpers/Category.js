import { db } from "../db.js";

export const checkCategoryExistence = (categoryId, res, callback) => {
    const query = "SELECT * FROM Categories WHERE Category_ID = ?";
    db.query(query, [categoryId], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      if (data.length === 0) {
        return res.status(409).json("Category not found!");
      }
  
      // Callback with the category data if it exists
      callback(data);
    });
  };
  export const updateCategoryInDatabase = (categoryId, updateFields, res) => {
    const setClause = Object.keys(updateFields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(updateFields);
    
    const query = `UPDATE categories SET ${setClause} WHERE Category_ID = ?`;
    values.push(categoryId);
  
    db.query(query, values, (err, data) => {
      if (err) {
        return res.status(500).json("Database error: " + err);
      }
  
      return res.status(200).json("Category has been updated.");
    });
  };