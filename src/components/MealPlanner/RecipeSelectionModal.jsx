import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RecipeSelectionModal = ({ onSelect, onClose }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipe");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div className="recipe-selection-modal">
      <div className="modal-content">
        <h2>Select a Recipe</h2>
        <button onClick={onClose} className="close-modal-button">Close</button>
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
              <span>{recipe.title}</span>
              <button onClick={() => onSelect(recipe)} className="select-recipe-button">
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

RecipeSelectionModal.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecipeSelectionModal;
