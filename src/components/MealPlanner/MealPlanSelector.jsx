import React from 'react';

const MealPlanSelector = ({ mealPlanId, allMealPlans, onSelect, onDeletePlan }) => {
    return (
      <div className="meal-plan-selector">
        <h3>Select Your Meal Plan</h3>
        <div className="meal-plan-controls">
          <select 
            value={mealPlanId || ''} 
            onChange={onSelect}
            className="form-control"
          >
            <option key="default" value="">Select a meal plan...</option>
            {allMealPlans.map((plan) => (
              <option key={plan._id || `plan-${plan.name}`} value={plan._id}>
                {plan.name}
              </option>
            ))}
          </select>
          {mealPlanId && (
            <button 
              key="delete-button"
              onClick={() => onDeletePlan(mealPlanId)}
              className="delete-plan-btn"
            >
              Delete Plan
            </button>
          )}
        </div>
      </div>
    );
  };

export default MealPlanSelector;