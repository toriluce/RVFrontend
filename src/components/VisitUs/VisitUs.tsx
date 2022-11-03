import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config";
import "./VisitUs.css";
import CampgroundInterface from "../CampgroundPage/CampgroundInterface"

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
    <div className="visitUsBox">
      <h1 className="visitUsText">Visit us at our other campgrounds!</h1>
      <div className="campgroundsDisplay">
        {data.map((campground: CampgroundInterface) => {
          if (
            (campground.name !== "Test RV Resort") &&
            (campground.campgroundId !== props.currentCampgroundId)
          ) {
            return (
              <a
                href={`/${campground.campgroundId}`}
                key={campground.campgroundId}
              >
                <img
                  className="visitUsPhotos"
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
