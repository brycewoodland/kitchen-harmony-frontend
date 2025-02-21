import Header from './components/Header';
import Hero from './components/Hero';
import RecipeHome from './components/RecipeHome';
import CookSection from './components/CookSection';

function App() {
  return (
    <div className='container-fluid'>
      <Header />
      <Hero />
      <RecipeHome />
      <CookSection />
    </div>
  );
}


export default App;