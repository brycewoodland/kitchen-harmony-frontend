import React, { useState } from 'react';
import '../App.css';

const RecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleTagChange = (e) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, description, ingredients, instructions, tags, imageUrl, isPublic };
    onAddRecipe(newRecipe);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>Add New Recipe</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="ingredients-list">
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      <div>
        <label>Instructions:</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      </div>
      <div>
        <label>Tags:</label>
        <input type="text" value={tags.join(', ')} onChange={handleTagChange} placeholder="Comma separated tags" />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div className="public-checkbox">
        <label>Public:</label>
        <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;