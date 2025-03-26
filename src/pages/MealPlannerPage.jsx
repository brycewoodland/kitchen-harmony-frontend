import React, { useState, useEffect } from 'react';
import { useMealPlan } from '../hooks/useMealPlans'; 
import { useAuth0 } from "@auth0/auth0-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { useRecipes } from '../hooks/useRecipes';
import '../App.css'; // Import the CSS file

const MealPlanner = () => {
  const { createMealPlan, addMealToPlan, fetchMealPlanByUser } = useMealPlan();
  const { isAuthenticated, user } = useAuth0();
  const { fetchAllRecipes } = useRecipes();

  // Form states
  const [mealPlanName, setMealPlanName] = useState('');
  const [mealPlanId, setMealPlanId] = useState(null);
  const [currentMealPlan, setCurrentMealPlan] = useState(null);
  const [allMealPlans, setAllMealPlans] = useState([]);  // Add this state

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
      fetchAndSetRecipes();
    }
  }, [isAuthenticated, user, fetchAllRecipes]);

  // Fetch user's meal plans
  useEffect(() => {
    const fetchAndSetMealPlans = async () => {
      if (isAuthenticated && user) {
        try {
          const userMealPlans = await fetchMealPlanByUser();
          if (userMealPlans && userMealPlans.length > 0) {
            setAllMealPlans(userMealPlans);
            // Set the first meal plan as default if none is selected
            if (!mealPlanId) {
              setMealPlanId(userMealPlans[0]._id);
              setCurrentMealPlan(userMealPlans[0]);
            }
          }
        } catch (error) {
          console.error('Error fetching meal plans:', error);
        }
      }
    };

    if (isAuthenticated) {
      fetchAndSetMealPlans();
    }
  }, [isAuthenticated, user, fetchMealPlanByUser]);

  // Handle meal plan selection
  const handleMealPlanSelect = (e) => {
    const selectedPlan = allMealPlans.find(plan => plan._id === e.target.value);
    if (selectedPlan) {
      setMealPlanId(selectedPlan._id);
      setCurrentMealPlan(selectedPlan);
      setMealsForSelectedDate([]); // Reset meals for the new plan
    }
  };

  // Handle the meal plan form submission
  const handleMealPlanSubmit = async (e) => {
    e.preventDefault();
  
    const mealPlanData = {
      name: mealPlanName,
      description: "My Meal Plan",
      meals: [],
      startDate: new Date(),
      endDate: new Date(),
      auth0Id: user?.sub
    };
  
    console.log("Submitting meal plan data:", mealPlanData);
  
    try {
      const newMealPlan = await createMealPlan(mealPlanData);
      console.log("New meal plan created:", newMealPlan);
      setMealPlanId(newMealPlan._id);
      setCurrentMealPlan(newMealPlan);
      setAllMealPlans(prev => [...prev, newMealPlan]); // Add new plan to the list
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
      recipeId: selectedRecipe._id,
      date: selectedDate,
      servings: 1
    };

    try {
      await addMealToPlan(mealPlanId, mealData);
      alert("Meal added to the plan!");
      // Optionally, update meals for the selected date
      setMealsForSelectedDate((prev) => [...prev, selectedRecipe]);
    } catch (error) {
      console.error("Error adding meal:", error);
      alert("Error adding meal: " + error.message);
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
          {/* Meal Plan Selector */}
          <div className="meal-plan-selector">
            <select 
              value={mealPlanId} 
              onChange={handleMealPlanSelect}
              className="meal-plan-dropdown"
            >
              {allMealPlans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display existing meal plan with its name */}
          <h2>{currentMealPlan?.name || 'Loading...'}</h2>
          
          {/* Add meals to the selected date */}
          <div className="meal-planner-add-meal">
            <h3>Add Meal to {selectedDate.toDateString()}</h3>
            <select onChange={(e) => setSelectedRecipe(recipes.find(r => r._id === e.target.value))}>
              <option value="">Select a recipe</option>
              {recipes.map((recipe) => (
                <option key={recipe._id} value={recipe._id}>
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
                <li key={meal._id}>{meal.title}</li>
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
