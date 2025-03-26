import React, { useState, useEffect } from 'react';
import { useMealPlan } from '../hooks/useMealPlans'; 
import { useAuth0 } from "@auth0/auth0-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { useRecipes } from '../hooks/useRecipes';
import '../App.css';

const MealPlanner = () => {
  const { createMealPlan, addMealToPlan, fetchMealPlanByUser } = useMealPlan();
  const { isAuthenticated, user } = useAuth0();
  const { fetchAllRecipes } = useRecipes();

  // Form states
  const [mealPlanName, setMealPlanName] = useState('');
  const [mealPlanId, setMealPlanId] = useState(null);
  const [currentMealPlan, setCurrentMealPlan] = useState(null);
  const [allMealPlans, setAllMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Meal plan details for each selected date
  const [mealsForSelectedDate, setMealsForSelectedDate] = useState([]);

  // Recipe list state
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes for the user to add
  useEffect(() => {
    let isMounted = true;

    const fetchAndSetRecipes = async () => {
      if (isAuthenticated && user) {
        try {
          const fetchedRecipes = await fetchAllRecipes();
          if (isMounted) {
            setRecipes(fetchedRecipes);
          }
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
    };

    fetchAndSetRecipes();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.sub]);

  // Fetch user's meal plans
  useEffect(() => {
    let isMounted = true;

    const fetchAndSetMealPlans = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        try {
          const userMealPlans = await fetchMealPlanByUser();
          if (isMounted) {
            if (userMealPlans && userMealPlans.length > 0) {
              setAllMealPlans(userMealPlans);
              if (!mealPlanId) {
                setMealPlanId(userMealPlans[0]._id);
                setCurrentMealPlan(userMealPlans[0]);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching meal plans:', error);
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };

    fetchAndSetMealPlans();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.sub]);

  // Update meals for selected date when date or meal plan changes
  useEffect(() => {
    if (currentMealPlan && selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      const mealsForDate = currentMealPlan.meals.filter(meal => {
        const mealDate = new Date(meal.date).toISOString().split('T')[0];
        return mealDate === selectedDateStr;
      });
      setMealsForSelectedDate(mealsForDate);
    }
  }, [selectedDate, currentMealPlan]);

  // Handle meal plan selection
  const handleMealPlanSelect = (e) => {
    const selectedPlan = allMealPlans.find(plan => plan._id === e.target.value);
    if (selectedPlan) {
      setMealPlanId(selectedPlan._id);
      setCurrentMealPlan(selectedPlan);
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
  
    try {
      const newMealPlan = await createMealPlan(mealPlanData);
      setMealPlanId(newMealPlan._id);
      setCurrentMealPlan(newMealPlan);
      setAllMealPlans(prev => [...prev, newMealPlan]);
      setMealPlanName(''); // Clear the input after successful creation
      alert("Meal Plan created successfully!");
    } catch (error) {
      console.error("Error creating meal plan:", error);
      alert("Error creating meal plan: " + error.message);
    }
  };

  // Handle recipe selection and adding to the selected date
  const handleAddMealToDay = async () => {
    if (!selectedRecipe || !mealPlanId) return;

    // Format the date to ensure it's in the correct format
    const formattedDate = new Date(selectedDate);
    formattedDate.setHours(0, 0, 0, 0); // Reset time to midnight

    // Create a simple meal object with minimal required data
    const mealData = {
      recipeId: selectedRecipe._id,
      date: formattedDate.toISOString(),
      title: selectedRecipe.title
    };

    try {
      console.log('Sending meal data:', mealData); // Debug log
      const updatedMealPlan = await addMealToPlan(mealPlanId, mealData);
      console.log('Updated meal plan:', updatedMealPlan); // Debug log
      setCurrentMealPlan(updatedMealPlan); // Update the current meal plan with the new meal
      setSelectedRecipe(null); // Reset the recipe selection
      alert("Meal added to the plan!");
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
    <div className="meal-planner-page">
      <div className="meal-planner-container">
        {/* Meal Plan Creation Form - Always visible */}
        <div className="meal-planner-form">
          <h2>Create a New Meal Plan</h2>
          <form onSubmit={handleMealPlanSubmit}>
            <input
              type="text"
              placeholder="Meal Plan Name"
              value={mealPlanName}
              onChange={(e) => setMealPlanName(e.target.value)}
              className="form-control"
              required
            />
            <button type="submit" className="btn-primary">Create Meal Plan</button>
          </form>
        </div>

        {/* Meal Plan Selector - Only show if there are meal plans */}
        {allMealPlans.length > 0 && (
          <div className="meal-plan-selector">
            <h3>Select Your Meal Plan</h3>
            <select 
              value={mealPlanId || ''} 
              onChange={handleMealPlanSelect}
              className="form-control"
            >
              <option value="">Select a meal plan...</option>
              {allMealPlans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Current Meal Plan Content */}
        {mealPlanId && currentMealPlan && (
          <>
            <h2 className="meal-plan-title">{currentMealPlan.name}</h2>
            
            {/* Add meals to the selected date */}
            <div className="meal-planner-add-meal">
              <h3>Add Meal to {selectedDate.toLocaleDateString()}</h3>
              <select 
                value={selectedRecipe?._id || ''}
                onChange={(e) => setSelectedRecipe(recipes.find(r => r._id === e.target.value))}
                className="form-control"
              >
                <option value="">Select a recipe</option>
                {recipes.map((recipe) => (
                  <option key={recipe._id} value={recipe._id}>
                    {recipe.title}
                  </option>
                ))}
              </select>
              <button 
                onClick={handleAddMealToDay} 
                className="btn-primary"
                disabled={!selectedRecipe}
              >
                Add Meal
              </button>
            </div>

            {/* Display meals for the selected date */}
            <div className="meal-planner-meals">
              <h3>Meals for {selectedDate.toLocaleDateString()}</h3>
              <ul>
                {mealsForSelectedDate.map((meal) => (
                  <li key={`${meal.recipeId}-${meal.date}`}>
                    {meal.title}
                  </li>
                ))}
                {mealsForSelectedDate.length === 0 && (
                  <li className="no-meals">No meals planned for this date</li>
                )}
              </ul>
            </div>
          </>
        )}

        {/* Calendar to select date */}
        <div className="meal-planner-calendar">
          <h3>Select a Date for Your Meal Plan</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
