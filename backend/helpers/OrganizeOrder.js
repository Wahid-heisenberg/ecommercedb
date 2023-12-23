export const organizeOrders = (orders) => {
    const organizedOrders = {};
  
    orders.forEach((order) => {
      const {
        Order_ID,
        Client_ID,
        Client_Name,
        Order_Status,
        Order_Date,
        Product_ID,
        Quantity,
      } = order;
  
      if (!organizedOrders[Order_ID]) {
        organizedOrders[Order_ID] = {
          Order_ID,
          Client_ID,
          Client_Name,
          Order_Status,
          Order_Date,
          Products: [],
        };
      }
  
      organizedOrders[Order_ID].Products.push({ Product_ID, Quantity });
    });
  
    return Object.values(organizedOrders);
  };