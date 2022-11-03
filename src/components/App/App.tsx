import "./App.css";
import HomePage from "../HomePage/HomePage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CampgroundPage from "../CampgroundPage/CampgroundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:campgroundId" element={<CampgroundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
