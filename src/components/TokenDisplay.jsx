import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TokenDisplay = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Retrieve the access token silently after the user logs in
      getAccessTokenSilently().then((accessToken) => {
        console.log('Access Token:', accessToken);  // Log it to the console
        setToken(accessToken);  // Store it in the state
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}!</p>
          <p>Your token: {token}</p>
        </>
      ) : (
        <p>Please log in first!</p>
      )}
    </div>
  );
};

export default TokenDisplay;
