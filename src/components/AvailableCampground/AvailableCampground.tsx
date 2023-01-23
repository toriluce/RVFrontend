import CampgroundInterface from "../../models/ICampground";

import "./AvailableCampground.css";

function AvailableCampground(props: CampgroundInterface) {
  return (
    <div className="available-campground">
      <img
        className="available-campground-image"
        src={props.photos[0]}
        alt={props.photos[0]}
      ></img>
      <h1 className="available-campground-name">{props.name}</h1>
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
