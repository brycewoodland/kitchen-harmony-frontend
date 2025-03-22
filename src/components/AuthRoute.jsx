import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthRoute = ({ element }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return isAuthenticated ? element : null;
};

export default AuthRoute;