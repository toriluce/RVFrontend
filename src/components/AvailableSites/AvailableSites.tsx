import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config";

import Site from "../Site/Site";

import SiteInterface from "../../models/ISite";

import "./AvailableSites.css";
import UnavailableSiteInterface from "../../models/IUnavailableSite";

const getAllSitesAtCampground = async (
  campgroundId: string
): Promise<SiteInterface[]> => {
  const res = await fetch(`${URL}/campgrounds/${campgroundId}/sites`, {
    method: "GET",
    headers: HEADERS,
  });
  return await res.json();
};

const getUnavailableSites = async (
  campgroundId: string,
  startDate: string,
  endDate: string
): Promise<UnavailableSiteInterface[]> => {
  const res = await fetch(
    `${URL}/campgrounds/${campgroundId}/unavailableSites?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: HEADERS,
    }
  );
  return await res.json();
};

// CALCULATE AVAILABLE SITES
const calculateAvailableSites = async (
  campgroundId: string,
  startDate: string,
  endDate: string
) => {
  const unavailableSites = await getUnavailableSites(
    campgroundId,
    startDate,
    endDate
  );

  const allSites = await getAllSitesAtCampground(campgroundId);

  const availableSites: SiteInterface[] = allSites.filter(
    (allSitesSite: SiteInterface) => {
      return !unavailableSites.find(
        (unavailableSite) => unavailableSite.siteId === allSitesSite.siteId
      );
    }
  );
 
  return availableSites;
};

// AVAILABLE SITES FUNCTION DEFINITION
const AvailableSites = (props: {
  campgroundId: string;
  startDate: string;
  endDate: string;
}) => {
  const [availableSites, setAvailableSites] = useState<SiteInterface[]>([]);

  useEffect(() => {
    calculateAvailableSites(props.campgroundId, props.startDate, props.endDate)
      .then((availableSites: SiteInterface[]) =>
        setAvailableSites(availableSites)
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {availableSites.length > 0 ? (
        availableSites.map((site: SiteInterface) => {
          return (
            <Site
              key={site.siteId}
              site={site}
              // siteId={site.siteId}
              // campgroundId={site.campgroundId}
              // amp15={site.amp15}
              // amp30={site.amp30}
              // amp50={site.amp50}
              // sewer={site.sewer}
              // water={site.water}
              // siteType={site.siteType}
              // campgroundSiteNumber={site.campgroundSiteNumber}
              // photos={site.photos}
              // pricePerNight={site.pricePerNight}
              startDate={props.startDate}
              endDate={props.endDate}
            />
          );
        })
      ) : (
        <div className="noAvailability">
          <h1>No available sites were found within specified date.</h1>
          <h2>Please enter a different date.</h2>
        </div>
      )}
    </div>
  );
};

export default AvailableSites;
