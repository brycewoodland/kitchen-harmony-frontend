function NavbarBrand() {
  return (
    <a className="navbar-brand" href="#">
      <img src="/logo.png" alt="Logo" style={{ height: '100px' }} /> {/* Adjust the height as needed */}
    </a>
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
    <ul className="navbar-nav mx-auto my-2 my-lg-0" style={{ '--bs-scroll-height': '100px' }}>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-disabled="true" href="#">Services</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-disabled="true" href="#">Contact</a>
      </li>
    </ul>
  );
}

function NavbarDropdown() {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle px-3 py-2 rounded" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
        style={{ backgroundColor: "black", color: "white", borderRadius: "8px" }}>
        Profile
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
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
          {/* New div to handle alignment */}
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