import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

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