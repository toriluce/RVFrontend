import React, { useState } from "react";
import "./Site.css";
import { URL, HEADERS } from "../../config";
import Alert from "../Alert/Alert";

function Site() {
  const dateToReserve = {
    siteId: "testsite",
    date: "12/01/2022",
    campgroundId: "000",
    customerId: "000",
    reservationId: "000",
    reservationCompleted: true,
  };

  const [isSuccessfullyBooked, setIsSuccessfullyBooked] = useState(false);

  const handleClick = () => {
    fetch(`${URL}/admin/reservedDate`, {
      method: "POST",
      mode: "cors",
      headers: HEADERS,
      body: JSON.stringify(dateToReserve),
    });
    setIsSuccessfullyBooked(true);
  };

  return (
    <div className="availableSite">
      <p>This is an available site.</p>
      <button className="bookButton finalBookButton" onClick={handleClick}>
        Book Now
      </button>
      {isSuccessfullyBooked ? (
        <Alert type="success" message="Reservation Confirmed!" />
      ) : null}
    </div>
  );
}

export default Site;
