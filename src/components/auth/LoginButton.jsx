import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsers } from "../../hooks/useUser"; // Updated import path

const LoginButton = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, error } = useAuth0();
  const { createUser, getUserById } = useUsers(); // Use custom hook
  const [userData, setUserData] = useState(null);
  const hasFetched = useRef(false); // Flag to prevent duplicate requests

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
            setUserData(existingUser);
          } else {
            // User doesn't exist, create the user
            createUser({ email, auth0Id }).then((newUser) => {
              if (newUser) {
                console.log("User created:", newUser);
                setUserData(newUser);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error checking user existence:", error);
        });
    }
  }, [isAuthenticated, user, getUserById, createUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    !isAuthenticated && (
      <button
        onClick={() => loginWithRedirect()}
        className="btn btn-primary"
        style={{ color: "white", backgroundColor: "black", borderRadius: "8px", padding: "10px" }}
      >
        Login
      </button>
    )
  );
};

export default LoginButton;
