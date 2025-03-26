import { useAuth0 } from "@auth0/auth0-react";

const API_URL = "http://localhost:3000/mealplan"; // Replace with your actual backend URL

export const useMealPlan = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // Fetch all meal plans
  const fetchAllMealPlans = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error("Failed to fetch meal plans");
      return await response.json();
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      throw error;
    }
  };

  // Fetch meal plan for the authenticated user
  const fetchMealPlanByUser = async () => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      console.log('Fetching meal plan for authenticated user');

      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      const rawResponse = await response.text();
      console.log('Raw server response:', rawResponse);

      if (!response.ok) {
        console.error(`Server responded with status: ${response.status}`);
        console.error('Error response from server:', rawResponse);
        const errorData = JSON.parse(rawResponse);
        throw new Error(errorData.message || `Failed to fetch meal plan for user: ${response.status}`);
      }

      return JSON.parse(rawResponse);
    } catch (error) {
      console.error("Error fetching meal plan by user:", error);
      throw error;
    }
  };

  // Create a new meal plan
  const createMealPlan = async (mealPlanData) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(mealPlanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create meal plan");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating meal plan:", error);
      throw error;
    }
  };

  // Update a meal plan by ID
  const updateMealPlan = async (mealPlanId, updatedData) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/${mealPlanId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update meal plan");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating meal plan:", error);
      throw error;
    }
  };

  // Delete a meal plan by ID
  const deleteMealPlan = async (mealPlanId) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/${mealPlanId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete meal plan");
      }
      return true;
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      throw error;
    }
  };

  // Fetch meal plan by ID (for MongoDB ObjectId)
  const fetchMealPlanById = async (mealPlanId) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      console.log(`Fetching meal plan with MongoDB ID: ${mealPlanId}`);

      const response = await fetch(`${API_URL}/${mealPlanId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const rawResponse = await response.text();
      console.log('Raw server response:', rawResponse);

      if (!response.ok) {
        console.error(`Server responded with status: ${response.status}`);
        console.error('Error response from server:', rawResponse);
        const errorData = JSON.parse(rawResponse);
        throw new Error(errorData.message || `Failed to fetch meal plan by ID: ${response.status}`);
      }

      return JSON.parse(rawResponse);
    } catch (error) {
      console.error("Error fetching meal plan by ID:", error);
      throw error;
    }
  };

  // Add a meal to an existing meal plan
  const addMealToPlan = async (mealPlanId, mealData) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      console.log('Adding meal to plan:', { mealPlanId, mealData }); // Debug log

      // First, get the current meal plan
      const currentMealPlan = await fetchMealPlanById(mealPlanId);

      // Add the new meal to the meals array
      const updatedMeals = [...(currentMealPlan.meals || []), mealData];

      // Update the meal plan with the new meals array
      const response = await fetch(`${API_URL}/${mealPlanId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ meals: updatedMeals }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add meal to plan");
      }

      // After successful update, fetch the updated meal plan
      const updatedMealPlan = await fetchMealPlanById(mealPlanId);
      return updatedMealPlan;
    } catch (error) {
      console.error("Error adding meal to plan:", error);
      throw error;
    }
  };

  return {
    fetchAllMealPlans,
    fetchMealPlanByUser,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
    fetchMealPlanById,
    addMealToPlan,
  };
};
