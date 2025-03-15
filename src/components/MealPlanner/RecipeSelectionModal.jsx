import React, { useState, useEffect } from 'react';

const RecipeSelectionModal = ({ onSelect, onClose }) => {
  const [recipes, setRecipes] = useState([]);  // State to store fetched recipes
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/recipe');
        const data = await response.json();
        setRecipes(data);  // Store recipes in state
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchRecipes(); // Call fetchRecipes when the modal is mounted
  }, []); 

  if (loading) {
    return <div>Loading recipes...</div>; // Show loading message while fetching
  }

  return (
    <div className="recipe-selection-modal">
      <div className="modal-content">
        <h2>Select a Recipe</h2>
        <button onClick={onClose} className="close-modal-button">Close</button>
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
              <span>{recipe.title} - {recipe.description}</span>
              <button onClick={() => onSelect(recipe)} className="select-recipe-button">Select</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeSelectionModal;
