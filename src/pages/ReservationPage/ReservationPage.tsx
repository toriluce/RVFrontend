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
import CustomerInput from "../../components/CustomerInput/CustomerInput";

const ReservationPage = () => {
  const { state } = useLocation();
  const { campground, site, endDate, startDate } = state;

  const [isReservationCompleted, setIsReservationCompleted] = useState(false);
  const [isReservationReviewed, setIsReservationReviewed] = useState(false);
  const [isReviewButtonClicked, SetIsReviewButtonClicked] = useState(false);


  const allReservationDates = [startDate, endDate];

  // const getAllReservationDates = () => {
  //   let currentDate = startDate;
  //   while (currentDate <= endDate) {
  //     allReservationDates.push(currentDate);
  //     currentDate + 1;
  //   }
  // };

  // getAllReservationDates();

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

  const reviewButtonClick = () => {
    setIsReservationReviewed(true);
    SetIsReviewButtonClicked(true);

  }

  return (
    <div className="App">
      <Header />
      <img
        className="campgroundMainImage"
        src={campground.photos[0]}
        alt={campground.photos[0]}
      ></img>
      <h1>Confirm Your Reservation Information</h1>
      <div className="reservationInformationBox">
        <a href={`/campgrounds/${site.campgroundId}`} key={site.campgroundId}>
          <img
            className="siteImage"
            src={campground.photos[0]}
            alt={campground.photos[0]}
          ></img>
        </a>
        <div className="reservationText">
          <a
            className="campgroundLink"
            href={`/campgrounds/${site.campgroundId}`}
            key={site.campgroundId}
          >
            <h2 className="campgroundTitle">{campground.name}</h2>
          </a>
          <h3>
            {site.siteType} Site #{site.campgroundSiteNumber}
          </h3>
          <p>From: {startDate}</p>
          <p>To: {endDate}</p>
          <p>Price Per Night: ${site.pricePerNight}</p>
          <h3 className="totalCostText">
            Total Cost: ${site.pricePerNight * allReservationDates.length}
          </h3>
        </div>
      </div>
      {isReviewButtonClicked ? <h1>Complete Reservation</h1> : (
        <button className="button looksGoodButton" onClick={reviewButtonClick}>
          Looks Good!
        </button>
      )}

      {isReservationReviewed ? (
        <div>
          <CustomerInput rvType="Fifth-Wheel" rvLength={30} />
          <button
            className="button reserveButton"
            onClick={reserveNowButtonClick}
          >
            Confirm Reservation
          </button>
        </div>
      ) : null}
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
