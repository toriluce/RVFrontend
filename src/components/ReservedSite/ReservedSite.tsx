import CampgroundInterface from "../../models/ICampground";
import SiteInterface from "../../models/ISite";

import "./ReservedSite.css";

interface reservedSiteInterface {
  site: SiteInterface;
  campground: CampgroundInterface;
  startDate: string;
  endDate: string;
  lengthOfStay: number;
}

const ReservedSite = (props: reservedSiteInterface) => {
  return (
    <section className="reserved-site-container">
      <div>
        <a
          href={`/campgrounds/${props.site.campgroundId}`}
          key={props.site.campgroundId}
        >
          <img
            className="reserved-site-image"
            src={props.campground.photos[0]}
            alt={props.campground.photos[0]}
          ></img>
        </a>
      </div>
      <div className="reserved-site-text-container">
        <a
          className="reserved-site-campground-link"
          href={`/campgrounds/${props.site.campgroundId}`}
          key={props.site.campgroundId}
        >
          <h2 className="reserved-site-campground-title">{props.campground.name}</h2>
        </a>
        <h3>
          {props.site.siteType} Site #{props.site.campgroundSiteNumber}
        </h3>
        <p>From: {props.startDate}</p>
        <p>To: {props.endDate}</p>
        <p>Price Per Night: ${props.site.pricePerNight}</p>
        <h3 className="reserved-site-total-cost">
          Total Cost: ${props.site.pricePerNight * props.lengthOfStay}
        </h3>
      </div>
    </section>
  );
};

export default ReservedSite;
