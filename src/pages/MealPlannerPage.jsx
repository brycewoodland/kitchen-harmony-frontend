import React, { useState } from 'react';
import '../App.css';
import RecipeSelectionModal from '../components/MealPlanner/RecipeSelectionModal';
import MealDayCard from '../components/MealPlanner/MealDayCard';

const MealPlannerPage = () => {
    const [mealPlan, setMealPlan] = useState({
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: null,
        Sunday: null
    });

    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleRecipeSelect = (day, recipe) => {
        setMealPlan(prevPlan => ({ ...prevPlan, [day]: recipe }));
        setShowModal(false);
    }

    return (
        <div className='container meal-planner-page'>
            <h1 className='meal-planner-title'>Weekly Meal Planner</h1>
            <div className='meal-grid'> 
                {Object.keys(mealPlan).map(day => (
                    <MealDayCard
                        key={day}
                        day={day}
                        recipe={mealPlan[day]}
                        onSelect={() => { setSelectedDay(day); setShowModal(true); }}
                        onRemove={() => setMealPlan(prevPlan => ({ ...prevPlan, [day]: null}))}
                    />
                ))}
            </div>
            {showModal && (
                <RecipeSelectionModal
                    onClose={() => setShowModal(false)}
                    onSelect={(recipe) => handleRecipeSelect(selectedDay, recipe)}
                />
            )}
        </div>
    )
};


export default MealPlannerPage;