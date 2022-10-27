import React from "react";
import "./Header.css";

function Header() {
  return (
    <header>
      <a className="homeLink" href="/">
        <h1 className="brandTitle">Campground Finder</h1>
      </a>
    </header>
  );
}

export default Header;
