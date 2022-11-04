import CampgroundInterface from "../../models/ICampground"

import "./Campground.css";

function Campground(props: CampgroundInterface) {
  return (
    <div className="campground">
      <img
        className="campgroundImage"
        src={props.photos[0]}
        alt={props.photos[0]}
      ></img>
      <h1>{props.name}</h1>
      <p>{props.address}</p>
      <p>{props.description}</p>
      <a href={`/${props.campgroundId}`}>
        <button className="button" type="button">
          Book Here
        </button>
      </a>
    </div>
  );
}

export default Campground;
