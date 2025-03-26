import React, { useState, useEffect } from 'react';
import { useMealPlan } from '../hooks/useMealPlans'; 
import { useAuth0 } from "@auth0/auth0-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { useRecipes } from '../hooks/useRecipes';
import '../App.css'; // Import the CSS file

const MealPlanner = () => {
  const { createMealPlan, addMealToPlan, fetchMealPlanById } = useMealPlan();
  const { isAuthenticated, user } = useAuth0();
  const { fetchAllRecipes } = useRecipes();

  // Form states
  const [mealPlanName, setMealPlanName] = useState('');
  const [mealPlanId, setMealPlanId] = useState(null);

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Meal plan details for each selected date
  const [mealsForSelectedDate, setMealsForSelectedDate] = useState([]);

  // Recipe list state
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes for the user to add
  useEffect(() => {
    const fetchAndSetRecipes = async () => {
      if (isAuthenticated && user) {
        const fetchedRecipes = await fetchAllRecipes();
        setRecipes(fetchedRecipes); 
      }
    };

    if (isAuthenticated) {
      fetchAndSetRecipes(); // Fetch recipes if the user is authenticated
    }
  }, [isAuthenticated, user, fetchAllRecipes]); // Dependency array includes isAuthenticated, user, and fetchAllRecipes

  // Fetch user's meal plans
  useEffect(() => {
    const fetchAndSetMealPlans = async () => {
      if (isAuthenticated && user) {
        const userMealPlans = await fetchMealPlanById(user.sub);  // Pass user.sub (auth0Id) to the API
        if (userMealPlans.length > 0) {
          setMealPlanId(userMealPlans[0].id); // Set the meal plan ID
        }
      }
    };

    if (isAuthenticated) {
      fetchAndSetMealPlans(); // Fetch meal plans if the user is authenticated
    }
  }, [isAuthenticated, user, fetchMealPlanById]); // Dependency array includes isAuthenticated, user, and fetchUserMealPlans

  // Handle the meal plan form submission
  const handleMealPlanSubmit = async (e) => {
    e.preventDefault();
  
    const mealPlanData = {
      name: mealPlanName,
      auth0Id: user?.sub,  // Pass auth0Id instead of userId
    };
  
    console.log("Submitting meal plan data:", mealPlanData);
  
    try {
      const newMealPlan = await createMealPlan(mealPlanData); // Create new meal plan
      console.log("New meal plan created:", newMealPlan);
      setMealPlanId(newMealPlan.id);  // Store the meal plan ID
      alert("Meal Plan created successfully!");
    } catch (error) {
      console.error("Error creating meal plan:", error);
      alert("Error creating meal plan: " + error.message);
    }
  };

  // Handle recipe selection and adding to the selected date
  const handleAddMealToDay = async () => {
    if (!selectedRecipe || !mealPlanId) return;

    const mealData = {
      mealPlanId,
      date: selectedDate,
      recipeId: selectedRecipe.id, // Assuming recipe has an 'id' field
    };

    try {
      await addMealToPlan(mealData);
      alert("Meal added to the plan!");
      // Optionally, update meals for the selected date
      setMealsForSelectedDate((prev) => [...prev, selectedRecipe]);
    } catch (error) {
      console.error("Error adding meal:", error);
      alert("Error adding meal");
    }
  };

  // Handle calendar date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="meal-planner-container">
      {mealPlanId ? (
        <>
          {/* Display existing meal plan */}
          <h2>Your Meal Plan</h2>
          {/* Add meals to the selected date */}
          <div className="meal-planner-add-meal">
            <h3>Add Meal to {selectedDate.toDateString()}</h3>
            <select onChange={(e) => setSelectedRecipe(recipes.find(r => r.id === e.target.value))}>
              <option value="">Select a recipe</option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
            </select>
            <button onClick={handleAddMealToDay}>Add Meal</button>
          </div>

          {/* Display meals for the selected date */}
          <div className="meal-planner-meals">
            <h3>Meals for {selectedDate.toDateString()}</h3>
            <ul>
              {mealsForSelectedDate.map((meal, index) => (
                <li key={meal.id}>{meal.title}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          {/* Meal Plan Creation Form */}
          <form className="meal-planner-form" onSubmit={handleMealPlanSubmit}>
            <h2>Create a New Meal Plan</h2>
            <input
              type="text"
              placeholder="Meal Plan Name"
              value={mealPlanName}
              onChange={(e) => setMealPlanName(e.target.value)}
              required
            />
            <button type="submit">Create Meal Plan</button>
          </form>
        </>
      )}

      {/* Calendar to select date */}
      <div className="meal-planner-calendar">
        <h3>Select a Date for Your Meal Plan</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    </div>
  );
};

export default MealPlanner;
