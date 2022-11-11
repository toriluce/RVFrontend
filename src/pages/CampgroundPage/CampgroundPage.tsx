import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL, HEADERS } from "../../config";

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

  const startDate: string = "2022-12-01";
  const endDate: string = "2022-12-03";

  // const startDate: string = document.getElementById("startDate").value;
  // const endDate: string = document.getElementById("endDate").value;

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
        <label htmlFor="startDate">Start Date: </label>
        <input id="startDate" type="date" name="Start Date"></input>
      </div>
      <br />
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input id="endDate" type="date"></input>

      </div>
      <br />
      <div>
        <button
          onClick={() => setIsDatesSubmitted(true)}
          className="button checkAvailabilityButton"
          type="button"
        >
          Check Availability
        </button>
      </div>
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
