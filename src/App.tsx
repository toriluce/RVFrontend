import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import CampgroundPage from "./pages/CampgroundPage/CampgroundPage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campgrounds/:campgroundId" element={<CampgroundPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/reservation-confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
