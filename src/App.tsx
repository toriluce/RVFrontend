import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import CampgroundPage from "./pages/CampgroundPage/CampgroundPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campgrounds/:campgroundId" element={<CampgroundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
