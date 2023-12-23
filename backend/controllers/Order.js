import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config()

const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

dotenv.config()

export const CreateOrder = async (req, res) => {
    try {
        const { Client_ID,  Order_Products } = req.body;

        // Set the Order_Date to the current date in dd/mm/yyyy hh:mm:ss format
        const Order_Date = getCurrentDate();

        // Create the order in the Orders table
        const createOrderQuery = `
            INSERT INTO Orders (Order_Date, Client_ID)
            VALUES (?, ?);
        `;
        await db.promise().query(createOrderQuery, [Order_Date, Client_ID]);

        // Get the last inserted Order_ID
        const getLastInsertedOrderIdQuery = `
            SELECT LAST_INSERT_ID() AS Order_ID;
        `;
        const [orderResult] = await db.promise().query(getLastInsertedOrderIdQuery);
        const orderID = orderResult[0].Order_ID;

        // Create the order products in the Order_Products table
        const orderProductsQuery = `
            INSERT INTO Order_Products (Product_ID, Quantity, Order_ID)
            VALUES ${Order_Products.map((product) => `(${product.Product_ID}, ${product.Quantity}, ${orderID})`).join(", ")};
        `;
        await db.promise().query(orderProductsQuery);

        res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create order" });
    }
};
