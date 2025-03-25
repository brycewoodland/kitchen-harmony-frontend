import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function ProtectedRoute({ component: Component }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component /> : null;
}
