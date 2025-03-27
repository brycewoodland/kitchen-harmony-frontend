import React from "react";
import { NavLink, useLocation } from 'react-router-dom';

function Footer() {

  const location = useLocation();

  const handleLinkClick = (e, path) => {
    if (location.pathname === path && window.scrollY !== 0) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer bg-dark text-white text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Learn more about Kitchen Harmony and our mission to provide unique and delicious recipes.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-white" onClick={(e) => handleLinkClick(e, '/')}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/recipes" className="text-white" onClick={(e) => handleLinkClick(e, '/recipes')}>Recipes</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <a href="https://www.facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <p>&copy; 2025 Kitchen Harmony. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;