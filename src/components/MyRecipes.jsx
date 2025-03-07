import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RecipeForm from './RecipeForm';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MyRecipes = () => {
  const { user, isAuthenticated } = useAuth0();
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [viewMyRecipes, setViewMyRecipes] = useState(true); // State to manage the toggle

  // Fetch the userId from MongoDB when the user logs in
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

  // Fetch recipes based on the toggle state
  useEffect(() => {
    if (isAuthenticated && userId) {
      const url = viewMyRecipes
        ? `http://localhost:3000/recipe/user/${userId}`
        : `http://localhost:3000/recipe`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error('Error fetching recipes:', error));
    }
  }, [isAuthenticated, userId, viewMyRecipes]);

  const handleAddRecipe = async (newRecipe) => {
    if (!userId) {
      console.log('User ID not found.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/recipe/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newRecipe, userId: userId }) 
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const addedRecipe = await response.json();
      setRecipes([...recipes, addedRecipe]);
      setShowForm(false); // Hide the form after adding the recipe
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
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
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {showForm && <RecipeForm onAddRecipe={handleAddRecipe} />}
      <div className="recipes-list row">
        {recipes.map((recipe, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card recipe-card">
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} className="card-img-top" alt={recipe.title} />
              )}
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                {/* Add more recipe details as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
