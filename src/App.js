import './App.css';
import { useState, useEffect } from "react";
// import dotenv from "dotenv"
// dotenv.config()

const URL = "http://localhost:3001"
// process.env.URL

const HEADERS = {
	Accept: "application/json",
	"Content-Type": "application/json",
}

const getPing = async () => {
	try {
		const res = await fetch(`${URL}/ping`, {
			method: "GET",
			headers: HEADERS,
		});

		return await res.json();
	} catch (err) {}
};

function App() {
  const [data, setData] = useState("Hello World!");

	useEffect(() => {
		getPing()
			.then((res) => setData(res.message))
			.catch((err) => console.log(err));
	}, []);

  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
