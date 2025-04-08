import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useRef } from "react";

const API_BASE_URL = "https://kitchen-harmony-backend.onrender.com/users";

export const useUsers = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const hasFetched = useRef(false);

  // Fetch user by Auth0 ID
  const getUserById = async (auth0Id) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const cleanAuth0Id = auth0Id.replace(/[|]/g, '_');

      const response = await fetch(`${API_BASE_URL}/auth0/${cleanAuth0Id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // User not found
        }
        throw new Error("Failed to fetch user");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  };

  // Create a new user
  const createUser = async (userData) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        throw new Error(errorData.message || "Failed to create user");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const getOrCreateUser = useCallback(async (auth0Id, email) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const cleanAuth0Id = auth0Id.replace(/[|]/g, '_');

      // Try to get existing user by Auth0 ID
      const response = await fetch(`${API_BASE_URL}/auth0/${cleanAuth0Id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        // User exists, return the existing user
        return await response.json();
      } else if (response.status === 404) {
        // User doesn't exist, check if the email is already registered
        const emailResponse = await fetch(`${API_BASE_URL}/email/${email}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (emailResponse.ok) {
          // Email exists, return the existing user
          return await emailResponse.json();
        }

        // Email does not exist, create new user
        const createResponse = await fetch(`${API_BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            auth0Id: cleanAuth0Id,
            email,
            fname: '',
            lname: '',
            username: email.split('@')[0],
            recipes: []
          }),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          console.error("Error creating user:", errorData);
          throw new Error(errorData.message || "Failed to create user");
        }

        return await createResponse.json();
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error in getOrCreateUser:", error);
      throw error;
    }
  }, []);

  const getUserByEmail = async (email) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/email/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error("Failed to fetch user by email");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && user.sub && user.email && !hasFetched.current) {
      hasFetched.current = true; // Mark that we've started fetching data for this user

      const { email, sub: auth0Id } = user;

      console.log("Auth0 ID:", auth0Id);
      console.log("Email:", email);

      // Fetch user by Auth0 ID
      getUserById(auth0Id)
        .then((existingUser) => {
          if (existingUser) {
            console.log("User already exists:", existingUser);
          } else {
            // Create user with proper error handling
            const newUserData = {
              email,
              auth0Id,
              // Add any other required fields here
            };

            createUser(newUserData)
              .then((newUser) => {
                if (newUser) {
                  console.log("User created:", newUser);
                }
              })
              .catch((error) => {
                console.error("Error creating user:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error checking user existence:", error);
        });
    }
  }, [isAuthenticated, user, getUserById, createUser]);

  return {
    getUserById,
    createUser,
    getOrCreateUser,
    getUserByEmail,
    updateUser,
    deleteUser
  };
};