import React from "react";
import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config.js";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AvailableSites from "../AvailableSites/AvailableSites";
import Footer from "../Footer/Footer";
import "./CampgroundPage.css";
import MoreCampgroundsDisplay from "../VisitUs/VisitUs";

const getSelectedCampground = async (campgroundId) => {
  const res = await fetch(`${URL}/${campgroundId}`, {
    method: "GET",
    headers: HEADERS,
  });
  return await res.json();
};

const CampgroundPage = (props) => {
  const [campground, setCampground] = useState();
  let { campgroundId } = useParams();
  // const availabilities = False;

  useEffect(() => {
    getSelectedCampground(campgroundId)
      .then((res) => setCampground(res))
      .catch((err) => console.log(err));
  }, []);

  const [isDatesSubmitted, setIsDatesSubmitted] = useState(false);

  return campground ? (
    <div className="App">
      <div className="campgroundPage">
        <Navbar />
        <div className="nameBox">
          <h2 className="bookYourStay">Book Your Stay at</h2>
          <h1 className="selectedCampgroundName">{campground.name}</h1>
        </div>
        <img
          className="campgroundPageImage"
          src={campground.photos[0]}
          alt={campground.photos[0]}
        ></img>
        <h1>Select Your Dates</h1>
        <button
          onClick={() => setIsDatesSubmitted(true)}
          className="bookButton checkAvailabilityButton"
          type="button"
        >
          Check Availability
        </button>
        {isDatesSubmitted ? <AvailableSites /> : <div></div>}
        <MoreCampgroundsDisplay currentCampgroundId={campground.campgroundId} />
        <Footer />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CampgroundPage;
