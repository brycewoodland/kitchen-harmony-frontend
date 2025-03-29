import React, { useState, useEffect } from 'react';
import { useMealPlan } from '../hooks/useMealPlans'; 
import { useAuth0 } from "@auth0/auth0-react";
import 'react-calendar/dist/Calendar.css'; 
import { useRecipes } from '../hooks/useRecipes';
import MealPlanForm from '../components/MealPlanner/MealPlanForm';
import MealPlanSelector from '../components/MealPlanner/MealPlanSelector';
import AddMealForm from '../components/MealPlanner/AddMealForm';
import MealList from '../components/MealPlanner/MealList';
import CalendarView from '../components/MealPlanner/CalendarView';
import Toast from '../components/Toast';

const MealPlanner = () => {
  const { 
    createMealPlan, 
    addMealToPlan, 
    fetchMealPlanByUser,
    deleteMealFromPlan,
    deleteMealPlan
  } = useMealPlan();
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

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

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
    if (currentMealPlan && selectedDate && currentMealPlan.meals) {
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      const mealsForDate = currentMealPlan.meals.filter(meal => {
        const mealDate = new Date(meal.date).toISOString().split('T')[0];
        return mealDate === selectedDateStr;
      });
      setMealsForSelectedDate(mealsForDate);
    } else {
      setMealsForSelectedDate([]);
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
      showToast("Meal Plan created successfully!");
    } catch (error) {
      console.error("Error creating meal plan:", error);
      showToast("Error creating meal plan: " + error.message, 'error');
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
      console.log('Adding meal to plan:', mealData);
      const updatedMealPlan = await addMealToPlan(mealPlanId, mealData);
      console.log('Updated meal plan:', updatedMealPlan);

      // Update both states immediately
      setCurrentMealPlan(updatedMealPlan);
      setAllMealPlans(prev => prev.map(plan => 
        plan._id === mealPlanId ? updatedMealPlan : plan
      ));

      // Update meals for selected date immediately
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      const updatedMealsForDate = updatedMealPlan.meals.filter(meal => {
        const mealDate = new Date(meal.date).toISOString().split('T')[0];
        return mealDate === selectedDateStr;
      });
      setMealsForSelectedDate(updatedMealsForDate);
      
      setSelectedRecipe(null); // Reset the recipe selection
      showToast("Meal added to the plan!");
    } catch (error) {
      console.error("Error adding meal:", error);
      showToast("Error adding meal: " + error.message, 'error');
    }
  };

  // Handle calendar date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle deleting a meal
  const handleDeleteMeal = async (mealId) => {
    if (!mealPlanId) return;

    try {
      const updatedMealPlan = await deleteMealFromPlan(mealPlanId, mealId);
      setCurrentMealPlan(updatedMealPlan);
      setAllMealPlans(prev => prev.map(plan => 
        plan._id === mealPlanId ? updatedMealPlan : plan
      ));
      showToast("Meal deleted successfully!");
    } catch (error) {
      console.error("Error deleting meal:", error);
      showToast("Error deleting meal: " + error.message, 'error');
    }
  };

  // Handle deleting a meal plan
  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this meal plan? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteMealPlan(planId);
      setAllMealPlans(prev => prev.filter(plan => plan._id !== planId));
      setMealPlanId(null);
      setCurrentMealPlan(null);
      setMealsForSelectedDate([]); // Clear the meals for selected date
      showToast("Meal plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      showToast("Error deleting meal plan: " + error.message, 'error');
    }
  };

  return (
    <div className="meal-planner-page">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
      <div className="meal-planner-container">
        <MealPlanForm 
          onSubmit={handleMealPlanSubmit}
          mealPlanName={mealPlanName}
          setMealPlanName={setMealPlanName}
        />

        {allMealPlans.length > 0 && (
          <MealPlanSelector 
            mealPlanId={mealPlanId}
            allMealPlans={allMealPlans}
            onSelect={handleMealPlanSelect}
            onDeletePlan={handleDeletePlan}
          />
        )}

        {mealPlanId && currentMealPlan && (
          <>
            <h2 className="meal-plan-title">{currentMealPlan.name}</h2>
            
            <div className="meal-planner-content">
              <div className="calendar-section">
                <h3>Select a Date</h3>
                <CalendarView 
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </div>

              <div className="meal-section">
                <h3>Add Meals for {selectedDate.toLocaleDateString()}</h3>
                <AddMealForm 
                  selectedDate={selectedDate}
                  recipes={recipes}
                  selectedRecipe={selectedRecipe}
                  onRecipeSelect={setSelectedRecipe}
                  onAddMeal={handleAddMealToDay}
                />

                <MealList 
                  selectedDate={selectedDate}
                  mealsForSelectedDate={mealsForSelectedDate}
                  onDeleteMeal={handleDeleteMeal}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
