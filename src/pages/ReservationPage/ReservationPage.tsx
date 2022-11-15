import { useLocation } from "react-router-dom";
import { useState } from "react";
import { DateTime } from "luxon";

import Header from "../../components/Header/Header";
import Alert from "../../components/Alert/Alert";
import VisitUs from "../../components/VisitUs/VisitUs";
import Footer from "../../components/Footer/Footer";

import UnavailableSiteInterface from "../../models/IUnavailableSite";
import CustomerInterface from "../../models/ICustomer";
import { HEADERS, URL } from "../../config";

import "./ReservationPage.css";

const ReservationPage = () => {
  const { state } = useLocation();
  const { site, endDate, startDate, campgroundImage } = state;

  const [isReservationCompleted, setIsReservationCompleted] = useState(false);

  const allReservationDates = [endDate];

  // const getAllReservationDates = () => {
  //   while (startDate <= endDate) {
  //     allReservationDates.push(DateTime.fromISO(startDate + 1));
  //   }
  // };
  // getAllReservationDates();
  // console.log("reservation dates list " + allReservationDates);

  allReservationDates.map((reservationDate) => {
    const unavailableSite: UnavailableSiteInterface = {
      campgroundId: site.campgroundId,
      siteId: site.siteId,
      date: reservationDate,
      reservationCompleted: false,
      customerId: "C.001",
      reservationId: "R.001",
    };

    fetch(`${URL}/admin/unavailableSite`, {
      method: "POST",
      mode: "cors",
      headers: HEADERS,
      body: JSON.stringify(unavailableSite),
    });
  });

  const reserveNowButtonClick = () => {
    // set reservationCompleted to true on unavailableSites
    // set reservationCompleted to true on Reservation
    const newCustomer: CustomerInterface = {
      name: "",
      rvLength: 0,
      rvType: "",
      phone: "",
      email: "",
    };
    fetch(`${URL}/admin/customer`, {
      method: "POST",
      mode: "cors",
      headers: HEADERS,
      body: JSON.stringify(newCustomer),
    });
    // add customerId to Reservation
    setIsReservationCompleted(true);
  };

  return (
    <div className="App">
      <Header />
      {/* <img
        className="campgroundMainImage"
        src={campgroundImage}
        alt={campgroundImage}
      ></img> */}
      <h1>Confirm Your Reservation Information</h1>
      <div className="reservationInformationBox">
        <a href={`/campgrounds/${site.campgroundId}`} key={site.campgroundId}>
          <img
            className="siteImage"
            src="https://campgroundsprojectcampgroundimages.s3.amazonaws.com/canyonPhoto1.JPG"
            alt="Available Site"
          ></img>
        </a>
        <div className="reservationText">
          <a
            className="campgroundLink"
            href={`/campgrounds/${site.campgroundId}`}
            key={site.campgroundId}
          >
            <h3 className="campgroundTitle">{site.campgroundId}</h3>
          </a>
          <h3>
            {site.siteType} Site #{site.campgroundSiteNumber}
          </h3>
          <p>From: {startDate}</p>
          <p>To: {endDate}</p>
          <p>Price Per Night: ${site.pricePerNight}</p>
          <h3>
            Total Cost: ${site.pricePerNight * allReservationDates.length}
          </h3>
        </div>
      </div>
      <button className="button reserveButton" onClick={reserveNowButtonClick}>
        Confirm Reservation
      </button>

      {isReservationCompleted ? (
        <Alert
          type="success"
          message="Reservation confirmed. You will receive an email from us shortly."
        />
      ) : null}

      <VisitUs currentCampgroundId={site.campgroundId} />
      <Footer />
    </div>
  );
};

export default ReservationPage;
