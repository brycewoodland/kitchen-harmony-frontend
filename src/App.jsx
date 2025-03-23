import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeHome from './components/RecipeHome';
import CookSection from './components/CookSection';
import Footer from './components/Footer';
import Contact from './components/Contact'; 
import AboutUs from './components/AboutUs';
import Service from './components/Service';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import MyRecipes from './pages/MyRecipes';
import MealPlannerPage from './pages/MealPlannerPage';
import LoginButton from './components/LoginButton';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  // Show loading state while Auth0 is loading authentication state
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
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginButton />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <LoginButton />} />
        <Route path="/my-recipes" element={isAuthenticated ? <MyRecipes /> : <LoginButton />} />
        <Route path="/mealplan" element={isAuthenticated ? <MealPlannerPage /> : <LoginButton />} />
        
        {/* Public Route */}
        <Route path="/login" element={<LoginButton />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
