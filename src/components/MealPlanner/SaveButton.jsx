import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";

const SaveButton = ({ mealPlan }) => {
    const { user, isAuthenticated } = useAuth0();

    const saveMealPlan = async () => {
        if (!isAuthenticated) {
            console.error("User is not authenticated");
            return;
        }

        const userId = user?.sub; // Get Auth0 User ID

        try {
            const response = await fetch("http://localhost:3000/mealplan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, mealPlan }),
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
        <button onClick={saveMealPlan}>Save Meal Plan</button>
    );
};

SaveButton.propTypes = {
    mealPlan: PropTypes.object.isRequired,
};

export default SaveButton;
