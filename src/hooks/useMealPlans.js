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
  try {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
    const response = await fetch(`${API_URL}/user`, {  // Ensure correct URL
      method: "GET",
      headers: { 
        Authorization: `Bearer ${accessToken}` 
      },
    });

    // Log the raw response text for debugging
    const rawResponse = await response.text(); // Read response as text first

    if (!response.ok) {
      // If response is not OK, log and throw the error with the raw response
      console.error("Error response from server:", rawResponse);
      const errorData = JSON.parse(rawResponse);  // Attempt to parse the error response if it's JSON
      throw new Error(errorData.message || "Failed to fetch meal plan for user");
    }

    // If response is OK, attempt to parse it as JSON
    return JSON.parse(rawResponse);  // Parse the response text as JSON
  } catch (error) {
    console.error("Error fetching meal plan by user:", error);
    throw new Error(error.message);  // Rethrow the error
  }
};


  // Create a new meal plan
  const createMealPlan = async (mealPlanData) => {
    if (!isAuthenticated) return;

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

      if (!response.ok) throw new Error("Failed to update meal plan");
      return await response.json();
    } catch (error) {
      console.error("Error updating meal plan:", error);
      throw error;
    }
  };

  // Delete a meal plan by ID
  const deleteMealPlan = async (mealPlanId) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/${mealPlanId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error("Failed to delete meal plan");
      return true;
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      return false;
    }
  };

  // Fetch meal plan by ID
  const fetchMealPlanById = async (mealPlanId) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/${mealPlanId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error("Failed to fetch meal plan by ID");
      return await response.json();
    } catch (error) {
      console.error("Error fetching meal plan by ID:", error);
      throw error;
    }
  };

  // Add a meal to an existing meal plan
  const addMealToPlan = async (mealPlanId, mealData) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/${mealPlanId}/add-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) throw new Error("Failed to add meal to plan");
      return await response.json();
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
