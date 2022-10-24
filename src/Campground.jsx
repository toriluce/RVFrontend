import React from "react";

function Campground(props) {
  return (
    <div className="campground">
      <img className="campgroundImage" src={props.mainPhoto} alt={props.mainPhoto}></img>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <button>Book Here</button>
    </div>
  );
}

export default Campground;