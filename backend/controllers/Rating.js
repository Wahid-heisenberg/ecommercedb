import { db } from "../db.js";

// Function to create a new rating
export const createRating = (req, res) => {
    const  User_ID  = req.params.userId ;
    const  Product_ID = req.params.productId

    console.log(Product_ID)
    const { Stars_Number, User_Comment } = req.body;

    // Check if the user exists
    const userQuery = 'SELECT * FROM Users WHERE User_ID = ?';
    db.query(userQuery,[User_ID] , (userError, userResults) => {
        if (userError) {
            console.error('Error checking user:', userError);
            res.status(500).json({ error: 'Error checking user' });
        } else if (userResults.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // Check if the product exists
            const productQuery = 'SELECT * FROM Products WHERE ProductID  = ?';
            db.query(productQuery, [Product_ID], (productError, productResults) => {
                if (productError) {
                    console.error('Error checking product:', productError);
                    res.status(500).json({ error: 'Error checking product' });
                } else if (productResults.length === 0) {
                    res.status(404).json({ message: 'Product not found' });
                } else {
                    // Create the rating
                    const query = 'INSERT INTO Ratings (Stars_Number, User_Comment, User_ID, Product_ID) VALUES (?, ?, ?, ?)';
                    const values = [Stars_Number, User_Comment, User_ID, Product_ID];
                    
                    db.query(query, values, (error, results) => {
                        if (error) {
                            console.error('Error creating rating:', error);
                            res.status(500).json({ error: 'Error creating rating' });
                        } else {
                            res.status(201).json({ message: 'Rating created successfully' });
                        }
                    });
                }
            });
        }
    });
};


// Function to get the average stars number and comments for each product
export const getAverageRating = (req, res) => {
    const query = 'SELECT r.Product_ID, AVG(r.Stars_Number) AS Average_Stars, GROUP_CONCAT(CONCAT(u.Username, ": ", r.User_Comment)) AS Comments FROM Ratings r JOIN Users u ON r.User_ID = u.User_ID GROUP BY r.Product_ID';
    
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error getting average rating:', error);
            res.status(500).json({ error: 'Error getting average rating' });
        } else {
            res.status(200).json(results);
        }
    });
};



// Function to delete a rating
export const deleteRating = (req, res) => {
    const ratingId = req.params.id;
    const query = 'DELETE FROM Rating WHERE Rating_ID = ?';
    
    db.query(query, ratingId, (error, results) => {
        if (error) {
            console.error('Error deleting rating:', error);
            res.status(500).json({ error: 'Error deleting rating' });
        } else {
            res.status(200).json({ message: 'Rating deleted successfully' });
        }
    });
};

