import React from 'react';

const MealList = ({ selectedDate, mealsForSelectedDate, onDeleteMeal }) => {
    return (
      <div className="meal-planner-meals">
        <h3>Meals for {selectedDate.toLocaleDateString()}</h3>
        <ul>
          {mealsForSelectedDate.map((meal) => (
            <li key={`${meal.recipeId}-${meal.date}`} className="meal-item">
              <span>{meal.title}</span>
              <button 
                onClick={() => onDeleteMeal(meal._id)}
                className="delete-meal-btn"
              >
                ×
              </button>
            </li>
          ))}
          {mealsForSelectedDate.length === 0 && (
            <li className="no-meals">No meals planned for this date</li>
          )}
        </ul>
      </div>
    );
  };

export default MealList;