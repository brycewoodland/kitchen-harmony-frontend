function HeroImage() {
  return (
    <div className="w-100">
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
    <div className="container-fluid justify-content-center text-center">
      <h1 className="fw-bold" style={{ marginTop: '20px' }}>Your cooking partner.</h1>
      <HeroImage />
    </div>
  );
}

export default Hero;