function NavbarBrand() {
  return (
    <a className="navbar-brand" href="#">Navbar scroll</a>
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
    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Recipes</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-disabled="true" href="#">Meal Plan</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-disabled="true" href="#">Grocery List</a>
      </li>
    </ul>
  );
}

function NavbarDropdown() {
  return (
    <li className="nav-item dropdown custom-margin-right">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Link
      </a>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Logout</a></li>
      </ul>
    </li>
  );
}

function NavbarSearch() {
  return (
    <form className="d-flex me-5" role="search"> {/* Added me-3 class for margin */}
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavbarBrand />
        <NavbarToggler />
        <div className="collapse navbar-collapse" id="navbarScroll">
          <NavbarNav />
          <div className="d-flex ms-auto">
            <NavbarSearch />
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