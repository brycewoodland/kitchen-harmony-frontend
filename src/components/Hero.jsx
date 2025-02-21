import '../App.css';

function HeroImage() {
  return (
    <div className="w-100 hero-image">
      <img
        src="https://placehold.co/1400x400?text=Hero+Image&font=roboto"
        alt="Hero"
        className="img-fluid"
        style={{ width: '100%', height: 'auto', marginTop: '20px' }}
      />
    </div>
  );
}

function Hero() {
  return (
    <div className="container-fluid justify-content-center text-center hero-container">
      <h1 className="fw-bold hero-heading" style={{ marginTop: '20px' }}>Your favorite cooking partner.</h1>
      <HeroImage />
      <button className="btn btn-dark mt-3 hero-button">
        Contact Us
      </button>
    </div>
  );
}

export default Hero;