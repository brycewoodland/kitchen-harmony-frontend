import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';

function NavbarBrand() {
  return (
    <NavLink className="navbar-brand" to="/">
      <img src="/logo.png" alt="Logo" style={{ height: '100px' }} /> {/* Adjust the height as needed */}
    </NavLink>
  );
}

function NavbarToggler() {
  return (
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}

function NavbarNav() {
  return (
    <ul className="navbar-nav mx-auto justify-content-center">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about" activeClassName="active">About Us</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/services" activeClassName="active">Services</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact" activeClassName="active">Contact</NavLink>
      </li>
    </ul>
  );
}

function NavbarDropdown({ user }) {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px', padding: '10px'}} // Set the text and background color to black
      >
        {user.fname} {user.lname}
      </a>
      <ul className="dropdown-menu dropdown-menu-end rounded-dropdown" aria-labelledby="navbarDropdown">
        <li>
          <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/profile">Profile</Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="/logout">Logout</a>
        </li>
      </ul>
    </li>
  );
}

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information from the REST API
    const userId = '67906759aa52af3c65c351ff'; // Replace with the actual user ID
    fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setIsAuthenticated(true);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavbarBrand />
        <NavbarToggler />
        <div className="collapse navbar-collapse" id="navbarScroll">
          <div className="d-flex w-100 justify-content-center">
            <NavbarNav />
          </div>
          <div className="d-flex ms-auto">
            <ul className="navbar-nav">
              {isAuthenticated ? <NavbarDropdown user={user} /> : (
                <li className="nav-item">
                  <button className="btn btn-primary" style={{ backgroundColor: 'black', padding: '10px' }}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;