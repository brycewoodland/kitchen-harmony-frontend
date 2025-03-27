import React from 'react';

const AddMealForm = ({ selectedDate, recipes, selectedRecipe, onRecipeSelect, onAddMeal }) => {
    return (
      <div className="meal-planner-add-meal">
        <h3>Add Meal to {selectedDate.toLocaleDateString()}</h3>
        <select 
          value={selectedRecipe?._id || ''}
          onChange={(e) => onRecipeSelect(recipes.find(r => r._id === e.target.value))}
          className="form-control"
        >
          <option value="">Select a recipe</option>
          {recipes.map((recipe) => (
            <option key={recipe._id} value={recipe._id}>
              {recipe.title}
            </option>
          ))}
        </select>
        <button 
          onClick={onAddMeal} 
          className="btn-primary"
          disabled={!selectedRecipe}
        >
          Add Meal
        </button>
      </div>
    );
  };

export default AddMealForm;