import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";
import RecipeSelectionModal from "../components/MealPlanner/RecipeSelectionModal";
import MealPlannerCalendar from "../components/MealPlanner/MealPlannerCalendar";

const MealPlannerPage = () => {
    const { user, isAuthenticated } = useAuth0(); // Get user info from Auth0
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
        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }

        const userId = user?.sub; // Get Auth0 user ID dynamically

        try {
            const response = await fetch("http://localhost:3000/mealplan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, mealPlan }), // Send userId and mealPlan
            });

            if (!response.ok) {
                throw new Error("Failed to save meal plan");
            }

            console.log("Meal plan saved successfully");
        } catch (error) {
            console.error("Error saving meal plan:", error);
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

            <button onClick={saveMealPlan} disabled={!isAuthenticated}>
                {isAuthenticated ? "Save Meal Plan" : "Login to Save"}
            </button>
        </div>
    );
};

export default MealPlannerPage;
