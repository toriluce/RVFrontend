import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config";

import Site from "../Site/Site";

import SiteInterface from "../../models/ISite"

const getAvailableSites = async () => {
  const res = await fetch(`${URL}/availableSites`, {
    method: "GET",
    headers: HEADERS,
  });
  return await res.json();
};

const AvailableSites = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getAvailableSites()
  //     .then((res) => setData(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div>
      <div>
        <Site />
        <Site />
        <Site />
      </div>
      {/* <div>
        {data.map((site: SiteInterface) => {
          return (
            <Site
              key={site.siteId}
              siteId={site.siteId}
              date={site.date}
              campgroundId={site.campgroundId}
              customerId={site.customerId}
              reservationId={site.reservationId}
              reservationCompleted={site.reservationCompleted}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default AvailableSites;
