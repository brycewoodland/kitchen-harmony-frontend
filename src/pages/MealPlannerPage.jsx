import { useState } from "react";
import "../App.css";
import RecipeSelectionModal from "../components/MealPlanner/RecipeSelectionModal";
import MealPlannerCalendar from "../components/MealPlanner/MealPlannerCalendar";

const MealPlannerPage = () => {
  const [mealPlan, setMealPlan] = useState({
    Monday: { Breakfast: null, Lunch: null, Dinner: null },
    Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
    Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
    Thursday: { Breakfast: null, Lunch: null, Dinner: null },
    Friday: { Breakfast: null, Lunch: null, Dinner: null },
    Saturday: { Breakfast: null, Lunch: null, Dinner: null },
    Sunday: { Breakfast: null, Lunch: null, Dinner: null },
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMealSelect, setShowMealSelect] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const handleRecipeSelect = (recipe) => {
    if (selectedDay && selectedMeal) {
      setMealPlan((prevPlan) => ({
        ...prevPlan,
        [selectedDay]: {
          ...prevPlan[selectedDay],
          [selectedMeal]: recipe,
        },
      }));
    }
    setShowRecipeModal(false);
    setShowMealSelect(false);
  };

  const handleRemoveRecipe = (day, mealType) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [mealType]: null,
      },
    }));
  };

  return (
    <div className="container meal-planner-page">
      <h1 className="meal-planner-title">Weekly Meal Planner</h1>
      <MealPlannerCalendar mealPlan={mealPlan} onSelect={(day) => {
        setSelectedDay(day);
        setShowMealSelect(true);
      }} onRemove={handleRemoveRecipe} />

      {/* Meal Selection Modal */}
      {showMealSelect && (
        <div className="meal-type-modal">
          <h3>Select Meal Type for {selectedDay}</h3>
          {["Breakfast", "Lunch", "Dinner"].map((meal) => (
            <button
              key={meal}
              onClick={() => {
                setSelectedMeal(meal);
                setShowMealSelect(false);
                setShowRecipeModal(true);
              }}
            >
              {meal}
            </button>
          ))}
          <button onClick={() => setShowMealSelect(false)}>Cancel</button>
        </div>
      )}

      {/* Recipe Selection Modal */}
      {showRecipeModal && (
        <RecipeSelectionModal
          onClose={() => setShowRecipeModal(false)}
          onSelect={handleRecipeSelect}
        />
      )}
    </div>
  );
};

export default MealPlannerPage;