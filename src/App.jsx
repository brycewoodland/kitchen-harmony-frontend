import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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


function App() {
  return (
    <Router>
      <div className='container-fluid p-0'>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;