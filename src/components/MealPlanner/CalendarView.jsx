import React from 'react';
import Calendar from 'react-calendar';

const CalendarView = ({ selectedDate, onDateChange }) => {
    return (
      <div className="meal-planner-calendar">
        <h3>Select a Date for Your Meal Plan</h3>
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          className="react-calendar"
        />
      </div>
    );
  };

export default CalendarView;