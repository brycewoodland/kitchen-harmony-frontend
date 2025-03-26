import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom'

console.log("VITE_AUTH0_DOMAIN:", import.meta.env.VITE_AUTH0_DOMAIN); // Add this line

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "http://localhost:3000"
        }}
        
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);