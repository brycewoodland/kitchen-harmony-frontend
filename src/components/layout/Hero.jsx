import React from "react";
import { Link } from 'react-router-dom';

function HeroImage() {
  return (
    <div className="w-100 hero-image">
      <img
        src="public/HeroImage.webp"
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
    </div>
  );
}

export default Hero;