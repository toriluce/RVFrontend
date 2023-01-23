import { useState, useEffect } from "react";
import { URL, HEADERS } from "../../config";

import Header from "../../components/Header/Header";
import AvailableCampground from "../../components/AvailableCampground/AvailableCampground";
import Footer from "../../components/Footer/Footer";

import CampgroundInterface from "../../models/ICampground";

const getCampgrounds = async () => {
  const res = await fetch(`${URL}/campgrounds`, {
    method: "GET",
    headers: HEADERS,
  });
  return await res.json();
};

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCampgrounds()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="diagonal-separator-pointed-up-left"></div>
      <div>
        {data.map((campground: CampgroundInterface) => {
          if (campground.name !== "Test RV Resort") {
            return (
              <AvailableCampground
                key={campground.campgroundId}
                campgroundId={campground.campgroundId}
                name={campground.name}
                address={campground.address}
                description={campground.description}
                photos={campground.photos}
              />
            );
          }
        })}
      </div>
      <div className="diagonal-separator-pointed-down-right"></div>
      <Footer />
    </div>
  );
};

export default HomePage;
