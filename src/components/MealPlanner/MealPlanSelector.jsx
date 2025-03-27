import React from 'react';

const MealPlanSelector = ({ mealPlanId, allMealPlans, onSelect }) => {
    return (
      <div className="meal-plan-selector">
        <h3>Select Your Meal Plan</h3>
        <select 
          value={mealPlanId || ''} 
          onChange={onSelect}
          className="form-control"
        >
          <option value="">Select a meal plan...</option>
          {allMealPlans.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default MealPlanSelector;