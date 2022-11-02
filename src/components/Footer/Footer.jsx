import React from "react";
import { DateTime } from "luxon";
import "./Footer.css";

function Footer() {
  const now = DateTime.now().year;

  return (
    <footer className="year">
      <p>Campground Finder {now}</p>
    </footer>
  );
}

export default Footer;
