import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeSelectionModal from './RecipeSelectionModal'; // Assume this is a modal to select a meal/recipe

const MealPlanForm = ({ onAddMealPlan, closeModal, availableMeals }) => {
  const navigate = useNavigate();

  // Initialize the meal plan state for the week
  const [mealPlan, setMealPlan] = useState({
    Monday: { Breakfast: '', Lunch: '', Dinner: '' },
    Tuesday: { Breakfast: '', Lunch: '', Dinner: '' },
    Wednesday: { Breakfast: '', Lunch: '', Dinner: '' },
    Thursday: { Breakfast: '', Lunch: '', Dinner: '' },
    Friday: { Breakfast: '', Lunch: '', Dinner: '' },
    Saturday: { Breakfast: '', Lunch: '', Dinner: '' },
    Sunday: { Breakfast: '', Lunch: '', Dinner: '' },
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate the form to ensure meals are selected for each day
  const validateForm = () => {
    const newErrors = {};
    Object.keys(mealPlan).forEach((day) => {
      Object.keys(mealPlan[day]).forEach((mealType) => {
        if (!mealPlan[day][mealType]) {
          newErrors[`${day}-${mealType}`] = `${mealType} is required for ${day}`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle the submission of the meal plan
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Add meal plan
    onAddMealPlan(mealPlan);

    // Reset the form and navigate
    resetForm();
    closeModal();
    navigate('/meal-plans', { replace: true });
  };

  // Reset the form to the initial state
  const resetForm = () => {
    setMealPlan({
      Monday: { Breakfast: '', Lunch: '', Dinner: '' },
      Tuesday: { Breakfast: '', Lunch: '', Dinner: '' },
      Wednesday: { Breakfast: '', Lunch: '', Dinner: '' },
      Thursday: { Breakfast: '', Lunch: '', Dinner: '' },
      Friday: { Breakfast: '', Lunch: '', Dinner: '' },
      Saturday: { Breakfast: '', Lunch: '', Dinner: '' },
      Sunday: { Breakfast: '', Lunch: '', Dinner: '' },
    });
    setErrors({});
  };

  // Handle selecting a meal for a specific day and meal type
  const handleMealSelect = (meal) => {
    if (selectedDay && selectedMealType) {
      setMealPlan((prevMealPlan) => ({
        ...prevMealPlan,
        [selectedDay]: {
          ...prevMealPlan[selectedDay],
          [selectedMealType]: meal,
        },
      }));
    }
    setShowRecipeModal(false);
  };

  return (
    <div>
      <div className="meal-plan-form-container">
        <form className="meal-plan-form" onSubmit={handleSubmit}>
          <h2>Create New Meal Plan</h2>

          {Object.keys(mealPlan).map((day) => (
            <div key={day}>
              <h3>{day}</h3>
              {Object.keys(mealPlan[day]).map((mealType) => (
                <div key={mealType}>
                  <label>{mealType}:</label>
                  <input
                    type="text"
                    value={mealPlan[day][mealType]}
                    readOnly
                    className={errors[`${day}-${mealType}`] ? 'invalid' : ''}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedMealType(mealType);
                      setShowRecipeModal(true);
                    }}
                  />
                  {errors[`${day}-${mealType}`] && (
                    <span className="error">{errors[`${day}-${mealType}`]}</span>
                  )}
                </div>
              ))}
            </div>
          ))}

          <button type="submit">Save Meal Plan</button>
        </form>
      </div>

      {showRecipeModal && (
        <RecipeSelectionModal
          availableMeals={availableMeals}
          onSelect={handleMealSelect}
          onClose={() => setShowRecipeModal(false)}
        />
      )}
    </div>
  );
};

export default MealPlanForm;
