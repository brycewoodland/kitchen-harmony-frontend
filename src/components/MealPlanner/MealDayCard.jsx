import React from "react";
import PropTypes from "prop-types";

const MealDayCard = ({ day, date, meals, onSelect, onRemove }) => {
  return (
    <div className="meal-day-card">
      <h3>{day} - {date}</h3>
      <div className="meal-details">
        {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
          meals[mealType] ? (
            <div key={mealType} className="meal-entry">
              <strong>{mealType}:</strong> 
              <span title={meals[mealType].description}>{meals[mealType].name}</span>
              <button onClick={() => onRemove(day, mealType)} className="remove-recipe-button">
                Remove
              </button>
            </div>
          ) : null
        ))}
      </div>
      <button onClick={() => onSelect(day)} className="select-recipe-button">
        Select Recipe
      </button>
    </div>
  );
};

MealDayCard.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  meals: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default MealDayCard;