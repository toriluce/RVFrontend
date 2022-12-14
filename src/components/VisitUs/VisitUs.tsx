import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config";

import CampgroundInterface from "../../models/ICampground";

import "./VisitUs.css";

interface Props {
  currentCampgroundId: string;
}

const getCampgrounds = async () => {
  const res = await fetch(`${URL}/campgrounds`, {
    method: "GET",
    headers: HEADERS,
  });
  return await res.json();
};

function VisitUs(props: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCampgrounds()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="visit-us-container">
      <h1 className="visit-us-text">Visit us at our other campgrounds!</h1>
      <div>
        {data.map((campground: CampgroundInterface) => {
          if (
            campground.name !== "Test RV Resort" &&
            campground.campgroundId !== props.currentCampgroundId
          ) {
            return (
              <a
                href={`/campgrounds/${campground.campgroundId}`}
                key={campground.campgroundId}
              >
                <img
                  className="visit-us-photos"
                  src={campground.photos[0]}
                  alt={campground.photos[0]}
                ></img>
              </a>
            );
          }
        })}
      </div>
    </div>
  );
}

export default VisitUs;
