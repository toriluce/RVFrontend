import { useState } from "react";
import { URL, HEADERS } from "../../config";

import Alert from "../Alert/Alert";

import SiteInterface from "../../models/ISite";

import "./Site.css";
import UnavailableSiteInterface from "../../models/IUnavailableSite";

interface siteComponentPropsInterface {
  site: SiteInterface;
  startDate: string;
  endDate: string;
}

const Site = (props: siteComponentPropsInterface) => {
  const unavailableSite: UnavailableSiteInterface = {
    campgroundId: props.site.campgroundId,
    siteId: props.site.siteId,
    date: props.startDate,
    reservationCompleted: false,
    customerId: "C.4c007010-76f9-466a-a70d-3ecbe6104ce8",
    reservationId: ""
  };

  const [isBookingRequested, setIsBookingRequested] = useState(false);

  const reserveNowButtonClick = () => {
    fetch(`${URL}/admin/unavailableSite`, {
      method: "POST",
      mode: "cors",
      headers: HEADERS,
      body: JSON.stringify(unavailableSite),
    });
    setIsBookingRequested(true);
  };

  return (
    <div className="availableSiteDisplay">
      <img
        className="siteImage"
        src="https://campgroundsprojectcampgroundimages.s3.amazonaws.com/canyonPhoto1.JPG"
        alt="Available Site"
      ></img>
      <div className="siteInformationBox">
        <div className="siteNameDescriptionBox">
          <h1>
            {props.site.siteType} Site #{props.site.campgroundSiteNumber}
          </h1>
          <p>Features:</p>
          <ul>
            {props.site.water ? <li>Water</li> : undefined}
            {props.site.amp30 ? <li>30 Amp</li> : undefined}
            {props.site.amp50 ? <li>50 Amp</li> : undefined}
            {props.site.sewer ? <li>Sewer</li> : undefined}
          </ul>
        </div>
      </div>

      <div className="finalBookButtonBox">
        <h1>${props.site.pricePerNight} / night</h1>
        <button
          className="button finalBookButton"
          onClick={reserveNowButtonClick}
        >
          Reserve Now
        </button>
      </div>
      {isBookingRequested ? (
        <Alert type="success" message="Reservation Confirmed!" />
      ) : null}
    </div>
  );
};

export default Site;
