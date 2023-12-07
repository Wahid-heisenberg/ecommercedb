// CreateCategory.js
import React, { useState } from 'react';
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

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}  encType="multipart/form-data">
        <label>
          Name:
          <input type="text" name="Name" value={categoryData.Name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="Description" value={categoryData.Description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="Image" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;

