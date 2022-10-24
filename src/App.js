import './App.css';
import { useState, useEffect } from "react";
import Footer from './Footer';
import Campground from './Campground';
import Header from './Header';
import { URL, HEADERS } from "./config.js"

const getCampgrounds = async () => {
	const res = await fetch(`${URL}/campgrounds`, {
		method: "GET",
		headers: HEADERS,
	})
	return await res.json();
}

function App() {
  const [data, setData] = useState([]);

	useEffect(() => {
		getCampgrounds()
			.then((res) => setData(res))
			.catch((err) => console.log(err));
	}, []);

  return (
    <div className="App">
	  <Header />
	  <ul>
		{data.map(campground => 
			{if (campground.name !== "Test RV Resort") {
				return(
					<Campground 
						key={campground.name} 
						name={campground.name}
						description={campground.description}
						mainPhoto={campground.photos[0]}
					/>
				);
			}}
		)}
	  </ul>
	  <Footer />
    </div>
  );
}

export default App;
