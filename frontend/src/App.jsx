// CreateCategory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
  const [categoryData, setCategoryData] = useState({
    Name: '',
    Description: '',
    Image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCategoryData({ ...categoryData, Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Name', categoryData.Name);
      formData.append('Description', categoryData.Description);
      formData.append('file', categoryData.Image);

      await axios.post('http://localhost:5000/api/category/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Optionally, you can handle success or redirect to another page.
      alert('Category created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating category');
    }
  };

 // [] means run once, after initial render
  const getCategories = async () => { 
    try {
      const { data } = await axios.get('http://localhost:5000/api/category/get');
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }
  const [categories, setCategories] = useState([]); // [] is the initial state value
  useEffect(() => {
    getCategories();
  }
  , []);

    // const [categoryData, setCategoryData] = useState({
    //   Name: '',
    //   Description: '',
    //   Image: null,
    // });
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setCategoryData({ ...categoryData, [name]: value });
    // };
  
    // const handleFileChange = (e) => {
    //   setCategoryData({ ...categoryData, Image: e.target.files[0] });
    // };
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
  
    //   try {
    //     const formData = new FormData();
    //     formData.append('Name', categoryData.Name);
    //     formData.append('Description', categoryData.Description);
    //     formData.append('file', categoryData.Image);
  
    //     await axios.patch('http://localhost:5000/api/category/update/1', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
  
    //     // Optionally, you can handle success or redirect to another page.
    //     alert('Category updated successfully');
    //   } catch (error) {
    //     console.error(error);
    //     alert('Error cupdating category');
    //   }
    // };
  



  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}  encType="multipart/form-data">
        <label >
          Name:
          <input className='border ml-4 p-2 mt-4' type="text" name="Name" value={categoryData.Name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type='text' className='border ml-4 p-2 mt-4 mb-4' name="Description" value={categoryData.Description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="Image" accept='*.png' onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Create Category</button>
      </form>

      <div className='flex flex-row flex-wrap gap-4'>
      {
      categories.map((category) => (
        <div  key={category.Category_ID}>
          <h3 className='text-blue-800 text-xl first-letter:capitalize'>{category.Name}</h3>
          <img className='w-[196px] h-[196px]' src={category.Image.slice(18)} alt={category.Name} />
          <p className='text-md text-center mt-2'>{category.Description}</p>
          
        </div>
      ))
      }
      </div>
    </div>
  );
}

export default CreateCategory;

