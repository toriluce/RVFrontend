import React from "react";
import { DateTime } from "luxon";

const now = DateTime.now().year;

function Footer() {
  return (
    <footer>
      <p className=".footer">{now}</p>
    </footer>
  );
}

export default Footer;
