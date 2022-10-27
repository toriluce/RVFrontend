import React from "react";
import "./Campground.css";

function Campground(props) {
  return (
    <div className="campground">
      <img
        className="campgroundImage"
        src={props.mainPhoto}
        alt={props.mainPhoto}
      ></img>
      <h1>{props.name}</h1>
      <p>{props.address}</p>
      <p>{props.description}</p>
      <a href={`/${props.campgroundId}`}>
        <button className="bookButton" type="button">
          Book Here
        </button>
      </a>
    </div>
  );
}

export default Campground;
