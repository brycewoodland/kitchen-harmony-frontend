import '../App.css';

function CookSection() {
  return (
    <div className="w-100 cook-section">
      <h1 className="text-center cook-section-title">Cook any meal quickly and easily.</h1>
      <div className="container">
        <div className="grid-container">
          <div className="grid-item">
            <img src="../public/fettucineAlfredo.jpg" alt="Fettucine Alfredo" className="img-fluid img-hover-zoom" loading="lazy" />
          </div>
          <div className="grid-item">
            <img src="../public/acaiBowl.jpg" alt="Acai Bowl" className="img-fluid img-hover-zoom" loading="lazy" />
          </div>
          <div className="grid-item">
            <img src="../public/soup.jpg" alt="Soup" className="img-fluid img-hover-zoom" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookSection;