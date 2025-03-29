import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import RecipeHome from './pages/RecipeHome';
import CookSection from './components/common/CookSection';
import Footer from './components/layout/Footer';
import Contact from './pages/Contact'; 
import AboutUs from './pages/AboutUs';
import Service from './components/common/Service';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import MealPlannerPage from './pages/MealPlanner';
import LoginButton from './components/auth/LoginButton';
import ShoppingList from './pages/ShoppingList';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [hasLoggedIn, setHasLoggedIn] = useState(false); // Track login state

  // Show loading state while Auth0 is loading authentication state
  useEffect(() => {
    if (isAuthenticated && !hasLoggedIn) {
      setHasLoggedIn(true); // Set the login state
      navigate('/dashboard'); // Redirect to dashboard if authenticated
    }
  }, [isAuthenticated, navigate, hasLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-0">
      <Header />
      <Routes>
        <Route path="/" element={<>
          <Hero />
          <RecipeHome />
          <CookSection />
        </>} />
        <Route path="/recipes" element={<RecipeHome />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/my-recipes" element={<ProtectedRoute component={MyRecipes} />} />
        <Route path="/mealplan" element={<ProtectedRoute component={MealPlannerPage} />} />
        <Route path="/shoppinglist" element={<ProtectedRoute component={ShoppingList} />} />
        
        {/* Public Route */}
        <Route path="/login" element={<LoginButton />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;