import { useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "../../components/Header/Header";
import Alert from "../../components/Alert/Alert";
import VisitUs from "../../components/VisitUs/VisitUs";
import Footer from "../../components/Footer/Footer";

import UnavailableSiteInterface from "../../models/IUnavailableSite";
import { HEADERS, URL } from "../../config";

import "./ReservationPage.css";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import ReservedSite from "../../components/ReservedSite/ReservedSite";

const ReservationPage = () => {
  const { state } = useLocation();
  const { campground, site, endDate, startDate } = state;

  const allReservationDates = [startDate, endDate];

  // INCOMPLETE TASK: add all reservation dates to allReservationDates list

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

  const [isReservationCompleted, setIsReservationCompleted] = useState(false);

  return (
    <div className="App">
      <Header />
      <img
        className="campgroundConfirmationImage"
        src={campground.photos[0]}
        alt={campground.photos[0]}
      ></img>
      <h1 className="confirmationHeader">
        Confirm Your Reservation Information:
      </h1>
      <div className="doublePageContainer">
        <ReservedSite
          site={site}
          campground={campground}
          startDate={startDate}
          endDate={endDate}
          lengthOfStay={allReservationDates.length}
        />
        <ReservationForm
          rvType="Fifth-Wheel"
          rvLength={30}
          setIsReservationCompleted={setIsReservationCompleted}
          isReservationCompleted={isReservationCompleted}
        />
      </div>
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
