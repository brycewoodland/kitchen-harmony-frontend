import { NavLink } from 'react-router-dom';

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

function NavbarDropdown() {
  return (
    <li className="nav-item dropdown w-100 w-lg-auto"> {/* Added w-100 for small screens and w-lg-auto for larger screens */}
      <a className="nav-link dropdown-toggle px-3 py-2 rounded w-100 text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
        style={{ backgroundColor: "black", color: "white", borderRadius: "8px" }}>
        Profile
      </a>
      <ul className="dropdown-menu dropdown-menu-end w-100"> {/* Added w-100 to make the dropdown span the full width */}
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Logout</a></li>
      </ul>
    </li>
  );
}

function Header() {
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
              <NavbarDropdown />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;