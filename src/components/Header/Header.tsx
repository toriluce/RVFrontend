import "./Header.css";

function Header() {
  return (
    <header className="header-container">
      <a className="header-home-link" href="/">
        <h1 className="header-brand-title">Campground Finder</h1>
      </a>
    </header>
  );
}

export default Header;
