import React from 'react';

const MealPlanForm = ({ onSubmit, mealPlanName, setMealPlanName }) => {
    return (
      <div className="meal-planner-form">
        <h2>Create a New Meal Plan</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Meal Plan Name"
            value={mealPlanName}
            onChange={(e) => setMealPlanName(e.target.value)}
            className="form-control"
            required
          />
          <button type="submit" className="btn-primary">Create Meal Plan</button>
        </form>
      </div>
    );
  };

export default MealPlanForm;