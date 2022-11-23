import CampgroundInterface from "../../models/ICampground"

import "./AvailableCampground.css";

function AvailableCampground(props: CampgroundInterface) {
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
      <a href={`/campgrounds/${props.campgroundId}`}>
        <button className="button" type="button">
          Book Here
        </button>
      </a>
    </div>
  );
}

export default AvailableCampground;
