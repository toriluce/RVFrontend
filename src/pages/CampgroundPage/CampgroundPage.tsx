import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL, HEADERS } from "../../config";
import { DateTime } from "luxon";

import Navbar from "../../components/Navbar/Navbar";
import AvailableSites from "../../components/AvailableSites/AvailableSites";
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

  const [startDate, setStartDate] = useState("2022-1-01");
  const [endDate, setEndDate] = useState("2022-1-04");

  const checkAvailabilityButtonClick = () => {
    if (startDate != null && endDate != null && startDate < endDate) {
      setIsDatesSubmitted(true);
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
      <div className="campgroundNameBox">
        <h2 className="bookYourStayText">Book Your Stay at</h2>
        <h1 className="campgroundNameText">{campground.name}</h1>
      </div>
      <img
        className="campgroundMainImage"
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
            setStartDate(event.target as any);
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
            setEndDate(event.target as any);
          }}
        ></input>
      </div>
      <br />
      <div>
        <button
          onClick={checkAvailabilityButtonClick}
          className="button checkAvailabilityButton"
          type="button"
        >
          Check Availability
        </button>
      </div>
      {isIncorrectDate ? (
        <div className="invalidDateRange">
          <h1>You have entered an invalid date range.</h1>
          <h2>Please refresh the page to select a new range.</h2>
        </div>
      ) : (
        <div></div>
      )}
      {isDatesSubmitted ? (
        <AvailableSites
          key={campgroundId}
          campgroundId={campgroundId}
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
