import PropTypes from "prop-types";

const MealDayCard = ({ day, meals }) => {
  return (
    <div className="meal-day-card">
      <h3>{day}</h3>
      {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
        <div key={mealType} className="meal-entry">
          <h4>{mealType}</h4>
          {meals[mealType] ? (
            <p>{meals[mealType].title}</p>
          ) : (
            <p>No meal planned</p>
          )}
        </div>
      ))}
    </div>
  );
};

MealDayCard.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.object.isRequired,
};

export default MealDayCard;
