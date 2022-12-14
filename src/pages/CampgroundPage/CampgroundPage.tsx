import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL, HEADERS } from "../../config";
import { DateTime } from "luxon";

import Navbar from "../../components/Navbar/Navbar";
import FindSites from "../../components/FindSites/FindSites";
import VisitUs from "../../components/VisitUs/VisitUs";
import Footer from "../../components/Footer/Footer";

import CampgroundInterface from "../../models/ICampground";

import "./CampgroundPage.css";

const getSelectedCampground = async (campgroundId: string) => {
  const res = await fetch(`${URL}/campgrounds/${campgroundId}`, {
    method: "GET",
    headers: HEADERS,
  });
  return await res.json();
};

const CampgroundPage = () => {
  const { campgroundId } = useParams();
  if (!campgroundId) {
    throw new Error("campgroundId is undefined");
  }

  const [campground, setCampground] = useState<CampgroundInterface>();

  const [isDatesSubmitted, setIsDatesSubmitted] = useState(false);
  const [isIncorrectDate, setIsIncorrectDate] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startDateTest = 2
  const endDateTest = 2
  const totalNights = endDateTest - startDateTest;

  const checkAvailabilityButtonClick = () => {
    if (startDate != null && endDate != null && startDate < endDate) {
      setIsDatesSubmitted(true);
      setIsIncorrectDate(false);
    } else {
      setIsIncorrectDate(true);
    }
  };

  useEffect(() => {
    getSelectedCampground(campgroundId)
      .then((res) => setCampground(res))
      .catch((err) => console.log(err));
  }, [campgroundId]);

  return campground ? (
    <div className="App">
      <Navbar />
      <div className="campground-name-container">
        <h2 className="book-your-stay">Book Your Stay at</h2>
        <h1 className="campground-name-text ">{campground.name}</h1>
      </div>
      <img
        className="campground-main-image"
        src={campground.photos[0]}
        alt={campground.photos[0]}
      ></img>
      <h1>Select Your Dates:</h1>
      <div>
        <label htmlFor="startDateInput">Start Date: </label>
        <input
          id="startDateInput"
          type="date"
          min={DateTime.now().toISODate()}
          onChange={(event) => {
            setStartDate(event.target.value as any);
          }}
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor="endDateInput">End Date: </label>
        <input
          id="endDateInput"
          type="date"
          min={DateTime.now().toISODate()}
          onChange={(event) => {
            setEndDate(event.target.value as any);
          }}
        ></input>
      </div>

      {totalNights ? <h3>{totalNights} NIGHTS</h3> : <br />}

      <div>
        <button
          onClick={checkAvailabilityButtonClick}
          className="button check-availability-button"
          type="button"
        >
          Check Availability
        </button>
      </div>
      {isIncorrectDate ? (
        <div className="invalid-date-range">
          <h1>You have entered an invalid date range.</h1>
          <h2>Please select a new range.</h2>
        </div>
      ) : (
        <div></div>
      )}
      {isDatesSubmitted ? (
        <FindSites
          key={campgroundId}
          campground={campground}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <div></div>
      )}
      <VisitUs currentCampgroundId={campground.campgroundId} />
      <Footer />
    </div>
  ) : (
    <div></div>
  );
};

export default CampgroundPage;
