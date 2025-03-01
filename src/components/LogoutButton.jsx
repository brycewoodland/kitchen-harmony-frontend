import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button
        onClick={() => logout({ returnTo: window.location.origin })}
        className="dropdown-item"
        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', color: 'inherit', padding: '10px' }}
      >
        Logout
      </button>
    )
  );
};

export default LogoutButton;