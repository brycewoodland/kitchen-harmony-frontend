import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/mealplan";

export const useMealPlan = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [error, setError] = useState(null);

  // Fetch meal plans for the authenticated user
  const fetchMealPlanByUser = async () => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      setError(error.message);
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
      const response = await axios.post(`${API_URL}`, mealPlanData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update a meal plan
  const updateMealPlan = async (mealPlanId, updatedData) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.put(`${API_URL}/${mealPlanId}`, updatedData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Delete a meal plan
  const deleteMealPlan = async (mealPlanId) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.delete(`${API_URL}/${mealPlanId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Add a meal to a meal plan
  const addMealToPlan = async (mealPlanId, mealData) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();
      console.log('Adding meal with data:', mealData);

      // First get the current meal plan
      const currentPlan = await axios.get(`${API_URL}/${mealPlanId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log('Current plan:', currentPlan.data);

      // Ensure meals array exists
      const currentMeals = currentPlan.data.meals || [];

      // Check if meal already exists for this date
      const existingMeal = currentMeals.find(meal =>
        meal.recipeId === mealData.recipeId &&
        new Date(meal.date).toISOString().split('T')[0] === new Date(mealData.date).toISOString().split('T')[0]
      );

      if (existingMeal) {
        throw new Error("This meal is already planned for this date");
      }

      // Add the new meal to the meals array
      const updatedMeals = [...currentMeals, mealData];

      // Update the meal plan with the new meals array while preserving all other data
      const updatedPlanData = {
        ...currentPlan.data,
        meals: updatedMeals
      };

      console.log('Updating plan with data:', updatedPlanData);

      const response = await axios.put(`${API_URL}/${mealPlanId}`, updatedPlanData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      console.log('Server response:', response.data);

      if (!response.data) {
        throw new Error("Invalid response from server: no data received");
      }

      // Ensure the response has a meals array
      if (!Array.isArray(response.data.meals)) {
        response.data.meals = updatedMeals;
      }

      return response.data;
    } catch (error) {
      console.error('Error in addMealToPlan:', error);
      setError(error.message);
      throw error;
    }
  };

  // Delete a meal from a meal plan
  const deleteMealFromPlan = async (mealPlanId, mealId) => {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    try {
      const accessToken = await getAccessTokenSilently();

      // First get the current meal plan
      const currentPlan = await axios.get(`${API_URL}/${mealPlanId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      // Ensure meals array exists
      const currentMeals = currentPlan.data.meals || [];

      // Filter out the meal to delete
      const updatedMeals = currentMeals.filter(meal => meal._id !== mealId);

      // Update the meal plan with the filtered meals array while preserving all other data
      const updatedPlanData = {
        ...currentPlan.data,
        meals: updatedMeals
      };

      const response = await axios.put(`${API_URL}/${mealPlanId}`, updatedPlanData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!response.data) {
        throw new Error("Invalid response from server: no data received");
      }

      // Ensure the response has a meals array
      if (!Array.isArray(response.data.meals)) {
        response.data.meals = updatedMeals;
      }

      return response.data;
    } catch (error) {
      console.error('Error in deleteMealFromPlan:', error);
      setError(error.message);
      throw error;
    }
  };

  return {
    fetchMealPlanByUser,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
    addMealToPlan,
    deleteMealFromPlan,
    error
  };
};
