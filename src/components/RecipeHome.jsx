import PropTypes from "prop-types";

function RecipeSection({ title, summary }) {
    return (
      <div className="col-md-4" style={{ marginTop: '80px' }}>
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
      <div className="container-fluid justify-content-center text-center">
        <h1 className="m-5">At Kitchen Harmony we provide unique recipes, which include:</h1>
        <div className="row">
          <RecipeSection
            title="Section 1"
            summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <RecipeSection
            title="Section 2"
            summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <RecipeSection
            title="Section 3"
            summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
        <h3 style={{marginTop: '100px' }}>Our Offering</h3>
      </div>
    );
  }

export default RecipeHome;