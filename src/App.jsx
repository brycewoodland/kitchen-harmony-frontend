import Header from './components/Header';
import Hero from './components/Hero';
import RecipeHome from './components/RecipeHome';
import CookSection from './components/CookSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className='container-fluid'>
      <Header />
      <Hero />
      <RecipeHome />
      <CookSection />
      <Footer />
    </div>
  );
}


export default App;