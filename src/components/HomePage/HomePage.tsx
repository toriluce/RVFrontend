import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Campground from "../Campground/Campground";
import Footer from "../Footer/Footer";
import { URL, HEADERS } from "../../config";
import CampgroundInterface from "../CampgroundPage/CampgroundInterface"

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
      <div>
        {data.map((campground: CampgroundInterface) => {
          if (campground.name !== "Test RV Resort") {
            return (
              <Campground
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
      <Footer />
    </div>
  );
};

export default HomePage;
