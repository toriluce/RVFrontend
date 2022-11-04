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
  const res = await fetch(`${URL}/${campgroundId}`, {
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

  useEffect(() => {
    getSelectedCampground(campgroundId)
      .then((res) => setCampground(res))
      .catch((err) => console.log(err));
  }, []);

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
      <h1>Select Your Dates</h1>
      <button
        onClick={() => setIsDatesSubmitted(true)}
        className="button checkAvailabilityButton"
        type="button"
      >
        Check Availability
      </button>
      {isDatesSubmitted ? <AvailableSites /> : <div></div>}
      <VisitUs currentCampgroundId={campground.campgroundId} />
      <Footer />
    </div>
  ) : (
    <div></div>
  );
};

export default CampgroundPage;
