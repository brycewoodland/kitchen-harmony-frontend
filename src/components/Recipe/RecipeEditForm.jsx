import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeEditForm = ({ editableRecipe, onInputChange, onIngredientChange, onSave, onCancel }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(editableRecipe.title);
  const [description, setDescription] = useState(editableRecipe.description);
  const [ingredients, setIngredients] = useState(editableRecipe.ingredients);
  const [instructions, setInstructions] = useState(editableRecipe.instructions);
  const [tags, setTags] = useState(editableRecipe.tags);
  const [imageUrl, setImageUrl] = useState(editableRecipe.imageUrl);
  const [isPublic, setIsPublic] = useState(editableRecipe.isPublic);
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

    // Proceed with adding or updating the recipe
    onSave({ 
      _id: editableRecipe._id,
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
    onCancel();
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

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const editTag = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags[index] = newTag;
    setTags(updatedTags);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      addTag(e.target.value);
      e.target.value = ''; // Clear input
    }
  };

  return (
    <div className="recipe-edit-form">
      <div>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'invalid' : ''}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? 'invalid' : ''}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => onIngredientChange(index, { ...ingredient, quantity: e.target.value })}
          />
          <input
            type="text"
            name="unit"
            value={ingredient.unit}
            onChange={(e) => onIngredientChange(index, { ...ingredient, unit: e.target.value })}
          />
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={(e) => onIngredientChange(index, { ...ingredient, name: e.target.value })}
          />
        </div>
      ))}

      <h3>Instructions</h3>
      <textarea
        name="instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <div>
        <label>Tags:</label>
        <input
          type="text"
          placeholder="Add a tag"
          onKeyDown={handleTagKeyDown}
        />
        <div className="tags-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag} <button type="button" onClick={() => removeTag(tag)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button className="save-button" onClick={handleSubmit}>Save Changes</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default RecipeEditForm;
