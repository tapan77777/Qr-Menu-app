import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import MenuItemCard from '../components/MenuItemCard';
import api from '../services/api';
import './HomePage.css';

const HomePage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const navigate = useNavigate(); // Navigation hook for the admin button

    useEffect(() => {
        // Fetch menu items from the backend
        const fetchMenuItems = async () => {
            try {
                const response = await api.get('/api/menu-items'); // Use relative path with baseURL from api.js
                setMenuItems(response.data);
                setFilteredItems(response.data); // Default to show all items
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    // Filter menu items based on the category
    const handleFilter = (category) => {
        setActiveFilter(category);
        if (category === 'All') {
            setFilteredItems(menuItems);
        } else {
            setFilteredItems(menuItems.filter((item) => item.category === category));
        }
    };

    return (
        <div className="homepage-container">
            <button
                className="admin-button"
                onClick={() => navigate('/login')} // Navigate to the login panel
            >
                Admin Panel
            </button>
            <h1>Our Menu</h1>
            <div className="filter-buttons">
                {['All', 'veg', 'non-veg', 'drinks'].map((category) => (
                    <button
                        key={category}
                        className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                        onClick={() => handleFilter(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="menu-items">
                {filteredItems.map((item) => (
                    <MenuItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
