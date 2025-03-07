import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function NavbarBrand() {
  return (
    <NavLink className="navbar-brand" to="/">
      <img src="/logo.png" alt="Logo" style={{ height: '100px' }} />{' '}
      {/* Adjust the height as needed */}
    </NavLink>
  );
}

function NavbarToggler() {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}

function NavbarNav() {
  return (
    <ul className="navbar-nav mx-auto justify-content-center">
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about">
          About Us
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/services">
          Services
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contact">
          Contact
        </NavLink>
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
        style={{ color: 'white', backgroundColor: 'black', borderRadius: '8px', padding: '10px' }} // Set the text and background color to black
      >
        {user.fname} {user.lname}
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end rounded-dropdown"
        aria-labelledby="navbarDropdown">
        <li>
          <Link className="dropdown-item" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </li>
  );
}

function Header() {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);

  const fetchUserByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/users/email/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserByEmail(user.email)
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [isAuthenticated, user]);

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
              {isAuthenticated && userData ? (
                <NavbarDropdown user={userData} />
              ) : (
                <li className="nav-item">
                  <LoginButton />
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