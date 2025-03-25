import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = 'http://localhost:3000/recipe';

export const useRecipes = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchRecipes = async (userId, viewMyRecipes) => {
    try {
      const accessToken = await getAccessTokenSilently();  // Fetch access token
      console.log("Access Token:", accessToken);  // Now log the token after it's been fetched

      const url = viewMyRecipes ? `${API_BASE_URL}/user/${userId}` : API_BASE_URL;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Add the access token to the headers
        },
      });

      if (!response.ok) throw new Error('Failed to fetch recipes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

  const addRecipe = async (userId, newRecipe) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...newRecipe, userId }),
      });

      if (!response.ok) throw new Error('Failed to add recipe');
      return await response.json();
    } catch (error) {
      console.error('Error adding recipe:', error);
      return null;
    }
  };

  const updateRecipe = async (updatedRecipe) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/${updatedRecipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) throw new Error('Failed to update recipe');
      return await response.json();
    } catch (error) {
      console.error('Error updating recipe:', error);
      return null;
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete recipe');
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return false;
    }
  };

  return { fetchRecipes, addRecipe, updateRecipe, deleteRecipe };
};
