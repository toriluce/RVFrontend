import './App.css';
import { useState, useEffect } from "react";


const getPing = async () => {
	try {
		const res = await fetch("http://localhost:3001/ping", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
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
