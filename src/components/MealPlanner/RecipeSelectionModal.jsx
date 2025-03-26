import React from 'react';

const RecipeSelectionModal = ({ availableMeals, onSelect, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a Meal</h2>
        <ul>
          {availableMeals.map((meal, index) => (
            <li key={index} onClick={() => onSelect(meal)}>
              {meal.title}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecipeSelectionModal;
