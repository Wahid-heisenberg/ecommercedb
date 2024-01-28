import { db } from "../db.js";
import dotenv from "dotenv";
import { getCurrentDate, formatDate } from "../helpers/DateFunctions.js";
import { organizeOrders } from "../helpers/OrganizeOrder.js";
dotenv.config();

export const CreateOrder = async (req, res) => {
  try {
    const { Client_ID, Order_Products } = req.body;
    console.log(req.body)
    const checkClientQuery = `
    SELECT User_ID FROM Users WHERE User_ID = ?;
`;
    const [clientResult] = await db
      .promise()
      .query(checkClientQuery, [Client_ID]);
    const clientExists = clientResult.length > 0;

    if (!clientExists) {
      return res.status(400).json({ message: "client does not exist!" });
    }
    // Set the Order_Date to the current date in dd/mm/yyyy hh:mm:ss format
    const Order_Date = getCurrentDate();

    // Check if the order products exist in the products table
    const productIds = Order_Products.map((product) => product.Product_ID);
    const checkProductsQuery = `
    SELECT ProductID FROM Products WHERE ProductID IN (?); ;
`;

    const [productsResult] = await db
      .promise()
      .query(checkProductsQuery, [productIds]);
    const existingProductIds = productsResult.map(
      (product) => product.ProductID
    );

    // Filter out the order products that do not exist in the products table
    const validOrderProducts = Order_Products.filter((product) =>
      existingProductIds.includes(product.Product_ID)
    );
    if (validOrderProducts.length !== Order_Products.length) {
      return res.status(400).json({ message: "Invalid order products" });
    }

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
            VALUES ${Order_Products.map(
              (product) =>
                `(${product.Product_ID}, ${product.Quantity}, ${orderID})`
            ).join(", ")};
        `;
    await db.promise().query(orderProductsQuery);

    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const UpdateOrderStatus = async (req, res) => {
  try {
    // Update the order status in the Orders table
    const updateOrderStatusQuery = `
                        UPDATE Orders SET Order_Status = ? WHERE Order_ID = ?;
                `;
    await db
      .promise()
      .query(updateOrderStatusQuery, [req.body.newStatus, req.params.Order_ID]);

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const GetAllOrders = async (req, res) => {
  try {
    // Get all orders with their assigned products and users
    const getAllOrdersQuery = `
            SELECT O.Order_ID, O.Order_Date, O.Order_Status, O.Client_ID,  OP.Product_ID, OP.Quantity
            FROM Orders O
            INNER JOIN Users U ON O.Client_ID = U.User_ID
            INNER JOIN Order_Products OP ON O.Order_ID = OP.Order_ID;
        `;
    const [ordersResult] = await db.promise().query(getAllOrdersQuery);
    const orders = ordersResult.map((order) => ({
      Order_ID: order.Order_ID,
      Order_Date: formatDate(order.Order_Date),
      Order_Status: order.Order_Status,
      Client_ID: order.Client_ID,
      Client_Name: order.Client_Name,
      Product_ID: order.Product_ID,
      Quantity: order.Quantity,
    }));

    res.status(200).json(organizeOrders(orders));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};
export const GetOrder = async (req, res) => {
  try {
    // Get the order with the specified order ID
    const getOrderQuery = `
      SELECT O.Order_ID, O.Order_Date, O.Order_Status, O.Client_ID,  OP.Product_ID, OP.Quantity
      FROM Orders O
      INNER JOIN Users U ON O.Client_ID = U.User_ID
      INNER JOIN Order_Products OP ON O.Order_ID = OP.Order_ID
      WHERE O.Order_ID = ?;
    `;
    const [orderResult] = await db.promise().query(getOrderQuery, [req.params.Order_ID]);

    if (orderResult.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
console.log(orderResult)
const order = orderResult.map((order) => ({
  Order_ID: order.Order_ID,
  Order_Date: formatDate(order.Order_Date),
  Order_Status: order.Order_Status,
  Client_ID: order.Client_ID,
  Client_Name: order.Client_Name,
  Product_ID: order.Product_ID,
  Quantity: order.Quantity,
}));

    res.status(200).json(organizeOrders(order));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get order" });
  }
};


export const DeleteOrder = async (req, res) => {
  try {
    // Delete the order from the Orders table
    const deleteOrderQuery = `
      DELETE FROM Orders WHERE Order_ID = ?;
    `;
    await db.promise().query(deleteOrderQuery, [req.params.Order_ID]);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
