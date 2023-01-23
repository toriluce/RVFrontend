import { DateTime } from "luxon";

import "./Footer.css";

function Footer() {
  const now = DateTime.now().year;

  return (
    <footer className="footer-link">
      <a className="footer-link" href="/">
        <p>Campground Finder {now}</p>
      </a>
    </footer>
  );
}

export default Footer;
