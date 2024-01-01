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
    const checkProductyQuery = "SELECT * FROM products WHERE Name = ?";

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
        "INSERT INTO products(`Name`, `Description`, `Price`,`OldPrice`,`Category_ID`, `Sub_Category_ID`) VALUES (?, ?, ?, ?  ,? , ?) ";
      const values = [
        req.body.Name,
        req.body.Description,
        req.body.Price,
        req.body.Price,
        req.query.Category_ID,
        req.query.Sub_Category_ID,
      ];

      db.query(createProductQuery, values, (err, data) => {
        if (err) {
          return res.status(500).json("Database error: " + err);
        }
        const productId = data.insertId;

        const createProductImageQuery = "INSERT INTO product_images (Product_ID, Image_URL) VALUES (?, ?)";
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
    const page = req.query.page || 1; // Default to page 1 if not specified
    const itemsPerPage = 8;

    const offset = (page - 1) * itemsPerPage;

    const q =
      "SELECT * FROM products join product_images on products.ProductID = product_images.Product_ID LIMIT ?, ?  ";
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
    const q = "SELECT * FROM products JOIN product_images ON products.ProductID = product_images.Product_ID WHERE products.ProductID = ?";

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


// export const UpdateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { Name, Price, OldPrice} = req.body;
//     const { Sub_Category_ID, Category_ID , Description} = req.query
//     const images = req.files;

//     console.log(req.files  )
//     // Check if the product exists in the database
//     const checkProductQuery = "SELECT * FROM Products WHERE ProductID = ?";
//     db.query(checkProductQuery, [id], (err, productData) => {
//       if (err) return res.status(500).json(err);
//       if (productData.length === 0) {
//         return res.status(404).json("Product not found!");
//       }

//       // Update the Name if provided and it doesn't exist in the database
//       if (Name && Name !== productData[0].Name) {
//         const checkNameQuery = "SELECT * FROM Products WHERE Name = ?";
//         db.query(checkNameQuery, [Name], (err, nameData) => {
//           if (err) return res.status(500).json(err);
//           if (nameData.length > 0) {
//             return res.status(400).json("Name already exists!");
//           }

//           // Update the Name in the database
//           const updateNameQuery = "UPDATE Products SET Name = ? WHERE ProductID = ?";
//           db.query(updateNameQuery, [Name, id], (err) => {
//             if (err) return res.status(500).json(err);
//           });
//         });
//       }

//       // Update the Description if provided
//       if (Description) {
//         const updateDescriptionQuery = "UPDATE Products SET Description = ? WHERE ProductID = ?";
//         db.query(updateDescriptionQuery, [Description, id], (err) => {
//           if (err) return res.status(500).json(err);
//         });
//       }

//       // Update the Sub_Category_ID if provided
//       if (Sub_Category_ID) {
//         // Check if the subcategory exists in the database
//         const checkSubCategoryQuery = "SELECT * FROM Subcategories WHERE Sub_Category_ID = ?";
//         db.query(checkSubCategoryQuery, [Sub_Category_ID], (err, subCategoryData) => {
//           if (err) return res.status(500).json(err);
//           if (subCategoryData.length === 0) {
//             return res.status(404).json("Subcategory not found!");
//           }

//           const updateSubCategoryQuery = "UPDATE Products SET Sub_Category_ID = ? WHERE ProductID = ?";
//           db.query(updateSubCategoryQuery, [Sub_Category_ID, id], (err) => {
//             if (err) return res.status(500).json(err);
//           });
//         });
//       }

//       if (Category_ID) {
//         // Check if the category exists in the database
//         const checkCategoryQuery = "SELECT * FROM Categories WHERE Category_ID = ?";
//         db.query(checkCategoryQuery, [Category_ID], (err, categoryData) => {
//           if (err) return res.status(500).json(err);
//           if (categoryData.length === 0) {
//             return res.status(404).json("Category not found!");
//           }

//           const updateCategoryQuery = "UPDATE Products SET Category_ID = ? WHERE ProductID = ?";
//           db.query(updateCategoryQuery, [Category_ID, id], (err) => {
//             if (err) return res.status(500).json(err);
//           });
//         });
//       }
//       if (Sub_Category_ID) {
//         const updateSubCategoryQuery = "UPDATE Products SET Sub_Category_ID = ? WHERE ProductID = ?";
//         db.query(updateSubCategoryQuery, [Sub_Category_ID, id], (err) => {
//           if (err) return res.status(500).json(err);
//         });
//       }

//       // Update the Category_ID if provided
//       if (Category_ID) {
//         const updateCategoryQuery = "UPDATE Products SET Category_ID = ? WHERE ProductID = ?";
//         db.query(updateCategoryQuery, [Category_ID, id], (err) => {
//           if (err) return res.status(500).json(err);
//         });
//       }

//       // Update the Price if provided
//       if (Price) {
//         const updatePriceQuery = "UPDATE Products SET Price = ? WHERE ProductID = ?";
//         db.query(updatePriceQuery, [Price, id], (err) => {
//           if (err) return res.status(500).json(err);
//         });
//       }

//       // Update the OldPrice if provided
//       if (OldPrice) {
//         const updateOldPriceQuery = "UPDATE Products SET OldPrice = ? WHERE ProductID = ?";
//         db.query(updateOldPriceQuery, [OldPrice, id], (err) => {
//           if (err) return res.status(500).json(err);
//         });
//       }

//       // Update the images if provided
//       if (images) {
//         // Delete existing images for the product
//         const deleteImagesQuery = "DELETE FROM Product_Images WHERE Product_ID = ?";
//         db.query(deleteImagesQuery, [id], (err) => {
//           if (err) return res.status(500).json(err);

//           // Insert new images for the product
//           const insertImagesQuery = "INSERT INTO Product_Images (Product_ID, Image_URL) VALUES ?";
//           const imageValues = images.map((image) => [id, image.path]);
//           db.query(insertImagesQuery, [imageValues], (err) => {
//             if (err) return res.status(500).json(err);
//           });
//         });
//       }

//       return res.status(200).json("Product updated successfully!");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Price, OldPrice , Description} = req.body;
    const { Sub_Category_ID, Category_ID} = req.query;
    const images = req.files;


    // Convert db.query into a function that returns a Promise
    const dbQuery = (query, values) => {
      return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    };

    // Check if the product exists in the database
    const productData = await dbQuery("SELECT * FROM products WHERE ProductID = ?", [id]);
    if (productData.length === 0) {
      return res.status(404).json("Product not found!");
    }

    // Update the Name if provided and it doesn't exist in the database
    if (Name && Name !== productData[0].Name) {
      const nameData = await dbQuery("SELECT * FROM products WHERE Name = ?", [Name]);
      if (nameData.length > 0) {
        return res.status(400).json("Name already exists!");
      }
      await dbQuery("UPDATE products SET Name = ? WHERE ProductID = ?", [Name, id]);
    }

    // Update the Description if provided
    if (Description) {
      await dbQuery("UPDATE products SET Description = ? WHERE ProductID = ?", [Description, id]);
    }

    // Update the Sub_Category_ID if provided
    if (Sub_Category_ID) {
      const subCategoryData = await dbQuery("SELECT * FROM subcategories WHERE Sub_Category_ID = ?", [Sub_Category_ID]);
      if (subCategoryData.length === 0) {
        return res.status(404).json("Subcategory not found!");
      }
      await dbQuery("UPDATE products SET Sub_Category_ID = ? WHERE ProductID = ?", [Sub_Category_ID, id]);
    }

    // Update the Category_ID if provided
    if (Category_ID) {
      const categoryData = await dbQuery("SELECT * FROM categories WHERE Category_ID = ?", [Category_ID]);
      if (categoryData.length === 0) {
        return res.status(404).json("Category not found!");
      }
      await dbQuery("UPDATE products SET Category_ID = ? WHERE ProductID = ?", [Category_ID, id]);
    }

    // Update the Price if provided
    if (Price) {
      await dbQuery("UPDATE products SET Price = ? WHERE ProductID = ?", [Price, id]);
    }

    // Update the OldPrice if provided
    if (OldPrice) {
      await dbQuery("UPDATE products SET OldPrice = ? WHERE ProductID = ?", [OldPrice, id]);
    }

    // Update the images if provided
// Update the images if provided
if (images && images.length > 0) {
  await dbQuery("DELETE FROM product_Images WHERE Product_ID = ?", [id]);
  const imageValues = images.map((image) => [id, image.path]);
  const placeholders = imageValues.map(() => '(?, ?)').join(', ');
  const flatValues = [].concat(...imageValues);
  await dbQuery(`INSERT INTO product_Images (Product_ID, Image_URL) VALUES ${placeholders}`, flatValues);
}

    return res.status(200).json("Product updated successfully!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the product
    const deleteProductQuery = "DELETE FROM products WHERE ProductID = ?";
    db.query(deleteProductQuery, [id], (err) => {
      if (err) return res.status(500).json(err);

      // Delete the product images
      const deleteImagesQuery = "DELETE FROM product_Images WHERE Product_ID = ?";
      db.query(deleteImagesQuery, [id], (err) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Product and its images deleted successfully!");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
