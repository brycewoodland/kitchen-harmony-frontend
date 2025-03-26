import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const API_BASE_URL = "http://localhost:3000/users"; // Adjust based on your backend

export const useUsers = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUser = async (req, res) => {
    try {
        console.log("Received data:", req.body); // Log the incoming data

        const { email, auth0Id } = req.body;  
        if (!email || !auth0Id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUserId = await getNextSequenceValue("userId");

        const newUser = new User({ email, id: newUserId, auth0Id, recipes: [] });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

  const getUserById = async (auth0Id) => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);
      const response = await fetch(`${API_BASE_URL}/auth0/${auth0Id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error("User not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  };

  const getOrCreateUser = useCallback(async (auth0Id, email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth0/${auth0Id}`);
        
        if (response.status === 404) {
            const createResponse = await fetch(`${API_BASE_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ auth0Id, email })
            });

            if (!createResponse.ok) {
                console.error("Create user error:", await createResponse.json());
                throw new Error("Failed to create user");
            }

            return await createResponse.json();
        }

        if (!response.ok) throw new Error("Failed to fetch user");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
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

      if (!response.ok) throw new Error("User not found");
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

      if (!response.ok) throw new Error("Failed to update user");
      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
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

      if (!response.ok) throw new Error("Failed to delete user");
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  };

  return { createUser, getUserById, getOrCreateUser, getUserByEmail, updateUser, deleteUser };
};
