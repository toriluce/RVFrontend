import React from "react";
import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config.js";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./CampgroundPage.css";

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

  useEffect(() => {
    getSelectedCampground(campgroundId)
      .then((res) => setCampground(res))
      .catch((err) => console.log(err));
  }, []);

  return campground ? (
    <div className="App">
      <Header />
      <img
        className="campgroundImage"
        src={campground.photos[0]}
        alt={campground.photos[0]}
      ></img>
      <h1>{campground.name}</h1>
      <p>{campground.address}</p>
      <p>{campground.description}</p>
      <Footer />
    </div>
  ) : (
    <div></div>
  );
};

export default CampgroundPage;
