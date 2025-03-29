import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const RecipeModal = ({ recipe, userId, onClose, onEditClick, onDelete }) => {
  return (
    <div className="recipe-modal-overlay">
      <div className="recipe-modal">
        <button className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>{recipe.title}</h2>
        <img src={recipe.imageUrl} alt={recipe.title} className="modal-image" />
        <p className="modal-description">{recipe.description}</p>

        <h3>Ingredients</h3>
        <ul className="modal-ingredients">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{`${ingredient.quantity} ${ingredient.unit} - ${ingredient.name}`}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p className="modal-instructions">{recipe.instructions}</p>

        {/* Show Edit Recipe button only if user is the owner */}
        {recipe.userId === userId && (
          <>
            <button className="edit-button" onClick={() => onEditClick(recipe)}>
              <FontAwesomeIcon icon={faEdit} />
              Edit Recipe
            </button>
            <button onClick={() => onDelete(recipe._id)} className="delete-button">
              <FontAwesomeIcon icon={faTrash} />
              Delete Recipe
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;