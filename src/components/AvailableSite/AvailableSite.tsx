import { useNavigate } from "react-router-dom";
import CampgroundInterface from "../../models/ICampground";
import SiteInterface from "../../models/ISite";

import "./AvailableSite.css";

interface siteComponentPropsInterface {
  campground: CampgroundInterface;
  site: SiteInterface;
  startDate: string;
  endDate: string;
}

const AvailableSite = (props: siteComponentPropsInterface) => {
  const navigate = useNavigate();

  return (
    <div className="available-site">
      <img
        className="available-site-image"
        src={props.campground.photos[0]}
        alt={props.campground.photos[0]}
      ></img>
      <div className="available-site-info-container">
        <div className="available-site-description-container">
          <h1>
            {props.site.siteType} Site #{props.site.campgroundSiteNumber}
          </h1>
          <p>Features:</p>
          <ul>
            {props.site.water ? <li>Water</li> : undefined}
            {props.site.amp30 ? <li>30 Amp</li> : undefined}
            {props.site.amp50 ? <li>50 Amp</li> : undefined}
            {props.site.sewer ? <li>Sewer</li> : undefined}
          </ul>
        </div>
      </div>

      <div className="book-button-container">
        <h1>${props.site.pricePerNight} / night</h1>
        <button
          className="button book-button"
          onClick={() => {
            navigate("/reservations", {
              state: {
                campground: props.campground,
                site: props.site,
                endDate: props.endDate,
                startDate: props.startDate,
              },
            });
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default AvailableSite;
