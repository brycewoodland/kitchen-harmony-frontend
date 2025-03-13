import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RecipeCard from '../components/Recipe/RecipeCard';
import RecipeModal from '../components/Recipe/RecipeModal';
import RecipeEditForm from '../components/Recipe/RecipeEditForm';
import RecipeForm from '../components/Recipe/RecipeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const MyRecipes = () => {
  const { user, isAuthenticated } = useAuth0();
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [viewMyRecipes, setViewMyRecipes] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableRecipe, setEditableRecipe] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserIdFromMongo = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/email/${user.email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserId(data._id);
        } catch (error) {
          console.error('Error fetching userId from MongoDB:', error);
        }
      };
      fetchUserIdFromMongo();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const url = viewMyRecipes
        ? `http://localhost:3000/recipe/user/${userId}`
        : 'http://localhost:3000/recipe';

      fetch(url)
        .then((response) => response.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error('Error fetching recipes:', error));
    }
  }, [isAuthenticated, userId, viewMyRecipes]);

  const handleAddRecipe = async (newRecipe) => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:3000/recipe/user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newRecipe, userId }),
      });
      if (!response.ok) throw new Error('Failed to add recipe');
      const addedRecipe = await response.json();
      setRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    if (!userId) return;
    fetch(`http://localhost:3000/recipe/${updatedRecipe._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe),
    })
      .then((response) => response.json())
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) => (recipe._id === updatedRecipe._id ? { ...recipe, ...updatedRecipe } : recipe))
        );
        setIsEditing(false);
        setEditableRecipe(null);
        setSelectedRecipe(null);
      })
      .catch((error) => console.error('Error updating recipe:', error));
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
    setEditableRecipe(null); // Optionally reset the editable recipe state
    setSelectedRecipe(null); // Optionally close the modal or reset the selected recipe
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your recipes.</div>;
  }

  return (
    <div className="container my-recipes-page">
      <h1 className="my-recipes-title">My Recipes</h1>
      <div className="header-controls">
        <div className="toggle-recipes-container">
          <label className="toggle">
            <input
              type="checkbox"
              checked={!viewMyRecipes}
              onChange={() => setViewMyRecipes(!viewMyRecipes)}
            />
            <span className="slider">
              <span className="slider-text">{viewMyRecipes ? 'My Recipes' : 'Other Recipes'}</span>
            </span>
          </label>
        </div>
        <button className="add-recipe-button" onClick={() => setShowForm(!showForm)}>
          <FontAwesomeIcon icon={showForm ? faMinus : faPlus} />
        </button>
      </div>

      {showForm && <RecipeForm onAddRecipe={handleAddRecipe} />}

      {!showForm && (
        <div className="recipes-list row">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onClick={setSelectedRecipe} />
          ))}
        </div>
      )}

      {selectedRecipe && !isEditing && (
        <RecipeModal
          recipe={selectedRecipe}
          userId={userId}
          onClose={() => setSelectedRecipe(null)}
          onEditClick={(recipe) => {
            setIsEditing(true);
            setEditableRecipe({ ...recipe });
          }}
        />
      )}

      {isEditing && editableRecipe && (
        <RecipeEditForm
          editableRecipe={editableRecipe}
          onInputChange={(e) => setEditableRecipe({ ...editableRecipe, [e.target.name]: e.target.value })}
          onIngredientChange={(index, e) => {
            const updatedIngredients = [...editableRecipe.ingredients];
            updatedIngredients[index] = { ...updatedIngredients[index], [e.target.name]: e.target.value };
            setEditableRecipe({ ...editableRecipe, ingredients: updatedIngredients });
          }}
          onSave={handleUpdateRecipe}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default MyRecipes;
