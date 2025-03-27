import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsers } from "../../hooks/useUser";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

function NavbarBrand() {
  return (
    <NavLink className="navbar-brand" to="/">
      <img src="/logo.png" alt="Logo" style={{ height: "100px" }} />
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
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}

function NavbarNav() {
  return (
    <ul className="navbar-nav mx-auto justify-content-center">
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/about">
          About Us
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/services">
          Services
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/contact">
          Contact
        </NavLink>
      </li>
    </ul>
  );
}

function NavbarDropdown({ user }) {
  const displayName = user?.fname && user?.lname ? `${user.fname} ${user.lname}` : user?.email;

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ color: "white", backgroundColor: "black", borderRadius: "8px", padding: "10px" }}
      >
        {displayName}
      </a>
      <ul className="dropdown-menu dropdown-menu-end rounded-dropdown" aria-labelledby="navbarDropdown">
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
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const { getOrCreateUser } = useUsers(); // Use custom hook
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.sub && user?.email) {
      console.log("Auth0 ID:", user.sub);
      console.log("Email:", user.email);

      getOrCreateUser(user.sub, user.email, user.given_name, user.family_name, user.nickname)
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [isAuthenticated, user, getOrCreateUser]);

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
                  <LoginButton onClick={() => loginWithRedirect()} className="btn btn-primary" />
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
