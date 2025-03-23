import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    // Clear authentication cookies (if needed)
    document.cookie = 'auth0|session=;expires=Thu, 01 Jan 1970 00:00:00 GMT';  // Optional: Clear auth0 session cookies
    logout({ returnTo: window.location.origin }); // Redirect to homepage after logout
  };

  return (
    isAuthenticated && (
      <button
        onClick={handleLogout}
        className="dropdown-item"
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          color: 'inherit',
          padding: '10px',
        }}
      >
        Logout
      </button>
    )
  );
};

export default LogoutButton;
