import React from 'react';

const MealDayCard = ({ day, recipe, onSelect, onRemove }) => {
  return (
    <div className="meal-day-card">
      <h3>{day}</h3>
      {recipe ? (
        <div className="recipe-info">
          <p>{recipe.name}</p>
          <button onClick={onRemove} className="remove-recipe-button">Remove</button>
        </div>
      ) : (
        <button onClick={onSelect} className="select-recipe-button">Select Recipe</button>
      )}
    </div>
  );
};

export default MealDayCard;
