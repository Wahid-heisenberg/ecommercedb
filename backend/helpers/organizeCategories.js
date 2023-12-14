export function organizeCategories(result) {
    const organizedResult = [];
    let currentMotherCategory = null;
  
    result.forEach(row => {
      // Find the existing category or create a new one
      let category = organizedResult.find(c => c.Category_ID === row.Category_ID);
  
      if (!category) {
        category = {
          Category_ID: row.Category_ID,
          Category_Name: row.Category_Name,
          Description: row.Description,
          Category_Image: row.Category_Image,
          subCategories: []
        };
        organizedResult.push(category);
      }
  
      // Add subcategory to the current category
      category.subCategories.push({
        Sub_Category_ID: row.Sub_Category_ID,
        Name: row.Name,
        Description: row.Sub_Category_Description,
        Image: row.Sub_Category_Image,
        Mother_Category: row.Mother_Category_ID
      });
    });
  
    return organizedResult;
  }