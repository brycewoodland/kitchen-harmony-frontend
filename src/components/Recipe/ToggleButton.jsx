import React from 'react';

const ToggleButton = ({ isChecked, onChange }) => {
  return (
    <label className="toggle">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="slider">
        <span className="slider-text">My Recipes</span>
        <span className="slider-text">All Recipes</span>
      </span>
    </label>
  );
};

export default ToggleButton;
