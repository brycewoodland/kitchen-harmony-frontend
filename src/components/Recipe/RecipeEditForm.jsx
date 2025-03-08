import React from 'react';

const RecipeEditForm = ({ editableRecipe, onInputChange, onIngredientChange, onSave, onCancel }) => {
  return (
    <div className="recipe-edit-form">
      <div>
        <input
          type="text"
          name="title"
          value={editableRecipe.title}
          onChange={onInputChange}
        />
      </div>
      <div>
        <textarea
          name="description"
          value={editableRecipe.description}
          onChange={onInputChange}
        />
      </div>

      <h3>Ingredients</h3>
      {editableRecipe.ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => onIngredientChange(index, e)}
          />
          <input
            type="text"
            name="unit"
            value={ingredient.unit}
            onChange={(e) => onIngredientChange(index, e)}
          />
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={(e) => onIngredientChange(index, e)}
          />
        </div>
      ))}

      <h3>Instructions</h3>
      <textarea
        name="instructions"
        value={editableRecipe.instructions}
        onChange={onInputChange}
      />

      <div className="button-container">
        <button className="save-button" onClick={() => onSave(editableRecipe)}>Save Changes</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default RecipeEditForm;
