function HeroImage() {
    return (
      <div className="d-flex justify-content-center">
        <img
          src="/HeroImage.png"
          alt="Hero"
          className="img-fluid"
          style={{ width: '90%', height: 'auto', marginTop: '20px' }}
        />
      </div>
    );
  }

function Hero() {
  return (
    <div className="d-flex flex-column justify-content-center text-center" style={{ margin: '2px 0 0 14px' }}>
      <h1 className="fw-bold">Your cooking partner.</h1>
      <HeroImage />
    </div>
  );
}

export default Hero;