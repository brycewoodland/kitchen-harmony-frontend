import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ recipe, onClick, onDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card recipe-card" onClick={() => onClick(recipe)}>
        {recipe.imageUrl && <img src={recipe.imageUrl} className="card-img-top" alt={recipe.title} />}
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.description}</p>
          <button className='btn btn-danger' onClick={(e) => { e.stopPropagation(); onDelete(recipe._id); }}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
