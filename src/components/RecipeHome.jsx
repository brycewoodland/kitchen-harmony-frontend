import PropTypes from 'prop-types';
import '../App.css'; 

function RecipeSection({ title, summary }) {
  return (
    <div className="col-md-4 recipe-section">
      <h3 className="fw-bold">{title}</h3>
      <p>{summary}</p>
    </div>
  );
}

RecipeSection.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

function RecipeHome() {
  return (
    <div className="container-fluid justify-content-center text-center recipe-home" style={{ padding: "50px"}}>
      <h1 className="recipe-home-title">At Kitchen Harmony we provide unique recipes, which include:</h1>
      <div className="row" style={{ padding: "100px", margin: '10px' }}>
        <RecipeSection
          title="Discover & Share Recipes"
          summary="Explore, create, and share your culinary masterpieces! From quick dinners to holiday dishes, we have a recipe for every occasion. Join our food-loving community and get inspired!"
        />
        <RecipeSection
          title="Seamless Ingredient Management"
          summary="Say goodbye to chaotic shopping lists! Easily add ingredients from any recipe and organize your shopping based on categories and quantities. Streamline your culinary adventure!"
        />
        <RecipeSection
          title="Collaborate & Create Together"
          summary="Cooking is better with friends! Collaborate on recipes, share tips, and create culinary delights together. Plan group meals and share your successes or challenges along the way."
        />
      </div>
      <h3 className="mt-5">Our Offering</h3>
    </div>
  );
}

export default RecipeHome;