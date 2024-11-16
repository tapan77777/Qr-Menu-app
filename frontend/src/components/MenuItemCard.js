import React from 'react';
import './MenuItemCard.css';

const MenuItemCard = ({ item }) => {
    // Determine the class based on category
    const categoryClass = item.category === 'veg' ? 'veg' : item.category === 'non-veg' ? 'non-veg' : 'drinks';

    return (
        <div className={`menu-item-card ${categoryClass}`}>
            <img src={item.imageURL} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
        </div>
    );
};

export default MenuItemCard;
