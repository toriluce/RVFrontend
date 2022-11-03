import "./Header.css";

function Header() {
  return (
    <header className="headerBox">
      <a className="homeLink" href="/">
        <h1 className="brandTitle">Campground Finder</h1>
      </a>
    </header>
  );
}

export default Header;