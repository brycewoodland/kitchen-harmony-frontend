import { useState } from "react";
import "../App.css";
import RecipeSelectionModal from "../components/MealPlanner/RecipeSelectionModal";
import MealPlannerCalendar from "../components/MealPlanner/MealPlannerCalendar";

const MealPlannerPage = () => {
    const [mealPlan, setMealPlan] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showRecipeModal, setShowRecipeModal] = useState(false);

    const handleRecipeSelect = (recipe) => {
        if (!selectedDay || !selectedMeal) return;

        setMealPlan((prevPlan) => ({
            ...prevPlan,
            [selectedDay]: {
                ...prevPlan[selectedDay],
                [selectedMeal]: recipe,
            },
        }));

        setShowRecipeModal(false);
    };

    const saveMealPlan = async () => {
        try {
            const response = await fetch("http://localhost:3000/mealplan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mealPlan),
            });

            if (!response.ok) {
                throw new Error("Failed to save meal plan");
            }

            console.log("Meal plan saved successfully");
            // Optionally, display a success message to the user
        } catch (error) {
            console.error("Error saving meal plan:", error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div className="container meal-planner-page">
            <h1 className="meal-planner-title">Weekly Meal Planner</h1>

            <MealPlannerCalendar
                mealsData={mealPlan}
                onSelect={(day, mealType) => {
                    setSelectedDay(day);
                    setSelectedMeal(mealType);
                    setShowRecipeModal(true);
                }}
            />

            {showRecipeModal && (
                <RecipeSelectionModal
                    onClose={() => setShowRecipeModal(false)}
                    onSelect={handleRecipeSelect}
                />
            )}

            <button onClick={saveMealPlan}>Save Meal Plan</button>
        </div>
    );
};

export default MealPlannerPage;