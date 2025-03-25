import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecipes } from '../hooks/useRecipes'; // Import the hook
import RecipeCard from '../components/Recipe/RecipeCard';
import RecipeModal from '../components/Recipe/RecipeModal';
import RecipeEditForm from '../components/Recipe/RecipeEditForm';
import RecipeForm from '../components/Recipe/RecipeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const MyRecipes = () => {
  const { user, isAuthenticated } = useAuth0();
  const { fetchRecipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
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
          if (!response.ok) throw new Error('Failed to fetch user data');
          const data = await response.json();
          setUserId(data._id);
        } catch (error) {
          console.error('Error fetching userId:', error);
        }
      };
      fetchUserIdFromMongo();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchRecipes(userId, viewMyRecipes).then(setRecipes);
    }
  }, [isAuthenticated, userId, viewMyRecipes]);

  const handleAddRecipe = async (newRecipe) => {
    if (!userId) return;
    const addedRecipe = await addRecipe(userId, newRecipe);
    if (addedRecipe) {
      setRecipes((prev) => [...prev, addedRecipe]);
      setShowForm(false);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    if (!userId) return;
    const success = await updateRecipe(updatedRecipe);
    if (success) {
      setRecipes((prev) =>
        prev.map((recipe) => (recipe._id === updatedRecipe._id ? { ...recipe, ...updatedRecipe } : recipe))
      );
      setIsEditing(false);
      setEditableRecipe(null);
      setSelectedRecipe(null);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!userId) return;
    const success = await deleteRecipe(recipeId);
    if (success) {
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableRecipe(null);
    setSelectedRecipe(null);
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
            <input type="checkbox" checked={!viewMyRecipes} onChange={() => setViewMyRecipes(!viewMyRecipes)} />
            <span className="slider">
              <span className="slider-text">{viewMyRecipes ? 'My Recipes' : 'Other Recipes'}</span>
            </span>
          </label>
        </div>
        <button className="add-recipe-button" onClick={() => setShowForm(!showForm)}>
          <FontAwesomeIcon icon={showForm ? faMinus : faPlus} />
        </button>
      </div>

      {showForm && <RecipeForm onAddRecipe={handleAddRecipe} closeModal={() => setShowForm(false)} />}

      {!showForm && (
        <div className="recipes-list row">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onClick={setSelectedRecipe} onDelete={handleDeleteRecipe} />
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
          onSave={handleUpdateRecipe}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default MyRecipes;
