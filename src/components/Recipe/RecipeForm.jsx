import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeForm = ({ onAddRecipe, closeModal }) => {
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!instructions.trim()) newErrors.instructions = 'Instructions are required';

    if (ingredients.some(ing => !ing.name.trim() || !ing.quantity.trim() || !ing.unit.trim())) {
      newErrors.ingredients = 'All ingredient fields are required';
    }

    if (imageUrl && !/^https?:\/\/.+\..+/.test(imageUrl)) {
      newErrors.imageUrl = 'Invalid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Proceed with adding the recipe
    onAddRecipe({ 
      title, 
      description, 
      ingredients, 
      instructions, 
      tags, 
      imageUrl, 
      isPublic 
    });

    // Reset form and navigate
    resetForm();
    closeModal();
    navigate('/my-recipes', { replace: true });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIngredients([{ name: '', quantity: '', unit: '' }]);
    setInstructions('');
    setTags([]);
    setImageUrl('');
    setIsPublic(false);
    setErrors({});
  };

  const handleBack = () => {
    closeModal();  
    navigate('/my-recipes', { replace: true });  
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={handleSubmit}>
          <h2>Add New Recipe</h2>

          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'invalid' : ''}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? 'invalid' : ''}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="ingredients-list">
            <label>Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-input">
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].quantity = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unit = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
                {ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(index)}>-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient}>+ Ingredient</button>
            {errors.ingredients && <span className="error">{errors.ingredients}</span>}
          </div>

          <div>
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className={errors.instructions ? 'invalid' : ''}
            />
            {errors.instructions && <span className="error">{errors.instructions}</span>}
          </div>

          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={errors.imageUrl ? 'invalid' : ''}
            />
            {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
          </div>

          <div>
            <label>Tags:</label>
            <input
              type="text"
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <div className="tags-list">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag} <button type="button" onClick={() => removeTag(tag)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className="public-checkbox">
            <label>Public:</label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </div>

          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
