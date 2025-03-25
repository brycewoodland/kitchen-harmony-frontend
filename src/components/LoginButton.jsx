import React, { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const LoginButton = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, error } = useAuth0();
  const [userData, setUserData] = useState(null);
  const hasFetched = useRef(false); // Flag to track if we've already fetched or created the user

  // Function to check if the user already exists or create them
  useEffect(() => {
    if (isAuthenticated && user && user.sub && user.email && !hasFetched.current) {
      hasFetched.current = true; // Mark that we've started fetching data for this user
      const { email, sub: auth0Id } = user;

      console.log('Auth0 ID:', auth0Id); // Log the Auth0 ID
      console.log('Email:', email); // Log the email

      // Fetch user by Auth0 ID
      axios.get(`http://localhost:3000/users/auth0/${auth0Id}`)
        .then(response => {
          if (response.data) {
            // User already exists
            console.log('User already exists:', response.data);
            setUserData(response.data); // Store user data
          } else {
            // User doesn't exist, create the user
            axios.post('http://localhost:3000/users', { email, auth0Id })
              .then(createResponse => {
                console.log('User created:', createResponse.data);
                setUserData(createResponse.data); // Store new user data
              })
              .catch(error => {
                console.error('Error creating user:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error checking user existence:', error);
        });
    }
  }, [isAuthenticated, user]); // Only re-run if isAuthenticated or user changes

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
        style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px', padding: '10px' }}
      >
        Login
      </button>
    )
  );
};

export default LoginButton;
