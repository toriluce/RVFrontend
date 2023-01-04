import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config";

import AvailableSite from "../AvailableSite/AvailableSite";

import SiteInterface from "../../models/ISite";

import "./FindSites.css";
import CampgroundInterface from "../../models/ICampground";

const getAvailableSites = async (
  campgroundId: string,
  startDate: string,
  endDate: string
): Promise<SiteInterface[]> => {
  const res = await fetch(
    `${URL}/campgrounds/${campgroundId}/availableSites?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: HEADERS,
    }
  );
  return await res.json();
};

const FindSites = (props: {
  campground: CampgroundInterface;
  startDate: string;
  endDate: string;
}) => {
  const [availableSites, setAvailableSites] = useState<SiteInterface[]>([]);

  useEffect(() => {
    getAvailableSites(props.campground.campgroundId, props.startDate, props.endDate)
      .then((availableSites: SiteInterface[]) =>
        setAvailableSites(availableSites)
      )
      .catch((err) => console.log(err));
  }, [props.startDate, props.endDate, props.campground.campgroundId]);

  return (
    <div>
      {availableSites.length > 0 ? (
        availableSites.map((site: SiteInterface) => {
          return (
            <AvailableSite
              key={site.siteId}
              campground={props.campground}
              site={site}
              startDate={props.startDate}
              endDate={props.endDate}
            />
          );
        })
      ) : (
        <div></div>
      )}
      {availableSites.length < 1 ? (
        <div className="no-availability">
          <h1>No available sites were found within specified date.</h1>
          <h2>Please enter a different date.</h2>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FindSites;
