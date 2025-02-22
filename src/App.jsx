import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeHome from './components/RecipeHome';
import CookSection from './components/CookSection';
import Footer from './components/Footer';
import Contact from './components/Contact'; // Import the Contact component

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
          <Route path="/cook" element={<CookSection />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;