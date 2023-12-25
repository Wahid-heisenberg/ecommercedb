export function organizeProducts(result) {
    const organizedResult = [];
    let currentProduct= null;
  
    result.forEach(row => {
      // Find the existing product or create a new one
      let product = organizedResult.find(c => c.product_ID === row.Product_ID);
  
      if (!product) {
        product = {
          product_ID: row.Product_ID,
          product_Name: row.Name,
          Description: row.Description,
          OldPrice :row.OldPrice ,
          Price :row.Price,
          AverageStars : row.AverageStars,
        //   product_Image: row.product_Image,
          Images: []
        };
        organizedResult.push(product);
      }
  
      // Add subproduct to the current product
      product.Images.push({
        Image_ID: row.Image_ID,
        Image_URL: row.Image_URL
      });
    });
  
    return organizedResult;
  }



