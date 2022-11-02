import React from "react";
import { DateTime } from "luxon";
import "./Footer.css";

const now = DateTime.now().year;

function Footer() {
  return (
    <footer className="year">
        <p>Campground Finder {now}</p>
    </footer>
  );
}

export default Footer;
