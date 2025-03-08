import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card recipe-card" onClick={() => onClick(recipe)}>
        {recipe.imageUrl && <img src={recipe.imageUrl} className="card-img-top" alt={recipe.title} />}
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
