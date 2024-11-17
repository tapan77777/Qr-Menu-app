import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });

  const API_BASE_URL = 'https://qr-menu-app-1.onrender.com'; // Base URL for deployed backend

  useEffect(() => {
    // Fetch all menu items when the component mounts
    axios
      .get(`${API_BASE_URL}/api/menu-items`)
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Handle Edit Item
  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      image: null,
    });
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: null,
    });
  };

  // Handle Delete Item
  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/api/menu-items/${id}`)
      .then(() => {
        setMenuItems(menuItems.filter((item) => item._id !== id));
      })
      .catch((error) => console.log(error));
  };

  // Handle Add New Item
  const handleAddItem = (e) => {
    e.preventDefault();

    const newItem = new FormData();
    newItem.append('name', formData.name);
    newItem.append('price', formData.price);
    newItem.append('category', formData.category);
    newItem.append('description', formData.description);

    if (formData.image) {
      newItem.append('image', formData.image);
    }

    axios
      .post(`${API_BASE_URL}/api/menu-items`, newItem)
      .then((response) => {
        setMenuItems([...menuItems, response.data]);
        setFormData({
          name: '',
          price: '',
          category: '',
          description: '',
          image: null,
        });
      })
      .catch((error) => console.log(error));
  };

  // Handle Change in Form Fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Update Item
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedItem = new FormData();
    updatedItem.append('name', formData.name);
    updatedItem.append('price', formData.price);
    updatedItem.append('category', formData.category);
    updatedItem.append('description', formData.description);

    if (formData.image) {
      updatedItem.append('image', formData.image);
    }

    axios
      .put(`${API_BASE_URL}/api/menu-items/${editingItem}`, updatedItem)
      .then((response) => {
        setMenuItems(
          menuItems.map((item) =>
            item._id === editingItem ? response.data : item
          )
        );
        setEditingItem(null);
        setFormData({
          name: '',
          price: '',
          category: '',
          description: '',
          image: null,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {/* Back Arrow Button */}
      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        &#8592; Home
      </button>

      <h1>Admin Page</h1>

      {/* Add Item Form */}
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleAddItem} className="edit-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="drinks">Drinks</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <button type="submit">Add Item</button>
      </form>

      <h2>Existing Menu Items</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className="item-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="item-container">
            {editingItem !== item._id ? (
              <>
                <img src={item.imageURL} alt={item.name} className="image" />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <p>{item.description}</p>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Item Name"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="drinks">Drinks</option>
                </select>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
                <div className="buttons-container">
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
