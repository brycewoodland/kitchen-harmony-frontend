import { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import MealDayCard from "./MealDayCard";
import 'react-calendar/dist/Calendar.css';

const MealPlannerCalendar = ({ mealsData, onSelect, onRemove }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const day = selectedDate.toLocaleDateString(undefined, { weekday: 'long' });
  const date = formatDate(selectedDate);
  const meals = mealsData && mealsData[selectedDate.toDateString()] ? mealsData[selectedDate.toDateString()] : { Breakfast: null, Lunch: null, Dinner: null };

  console.log("Selected Date:", selectedDate);
  console.log("Meals Data:", mealsData);
  console.log("Meals for Selected Date:", meals);

  return (
    <div className="meal-planner-calendar">
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <MealDayCard day={day} date={date} meals={meals} onSelect={onSelect} onRemove={onRemove} />
    </div>
  );
};

MealPlannerCalendar.propTypes = {
  mealsData: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default MealPlannerCalendar;