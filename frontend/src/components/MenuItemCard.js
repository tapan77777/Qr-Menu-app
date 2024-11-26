import React, { useState } from 'react';
import './MenuItemCard.css';

const MenuItemCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Determine the class based on category
  const categoryClass =
    item.category === 'veg' ? 'veg' : item.category === 'non-veg' ? 'non-veg' : 'drinks';

  return (
    <>
      {/* Main card */}
      <div className={`menu-item-card ${categoryClass}`} onClick={handleCardClick}>
        <img src={item.imageURL} alt={item.name} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ₹{item.price}</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <img src={item.imageURL} alt={item.name} className="modal-image" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
