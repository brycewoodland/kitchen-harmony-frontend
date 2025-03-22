import { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const MealPlannerCalendar = ({ mealsData, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMealDetails, setShowMealDetails] = useState(false);

  const formatDate = (date) => date.toDateString(); 
  const selectedDay = formatDate(selectedDate);
  const meals = mealsData[selectedDay] || { Breakfast: null, Lunch: null, Dinner: null };

  return (
    <div className="meal-planner-calendar">
      <Calendar 
        onChange={(date) => {
          setSelectedDate(date);
          setShowMealDetails(true);
        }} 
        value={selectedDate} 
      />

      {showMealDetails && (
        <div className="meal-details">
          <h3>Meal Plan for {selectedDay}</h3>
          {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
            <div key={mealType} className="meal-entry">
              <h4>{mealType}</h4>
              {meals[mealType] ? (
                <p>{meals[mealType].title}</p>
              ) : (
                <p>No meal planned</p>
              )}
              {/* Add Recipe Button */}
              <button onClick={() => onSelect(selectedDay, mealType)}>Add Recipe</button>
            </div>
          ))}
          <button onClick={() => setShowMealDetails(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

MealPlannerCalendar.propTypes = {
  mealsData: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default MealPlannerCalendar;
