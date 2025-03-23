import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = window.location.origin; // The URL to redirect to after login

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap App with both Auth0Provider and Router
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: redirectUri }} // Ensure redirect_uri is set here
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);
