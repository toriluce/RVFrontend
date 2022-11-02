import "./App.css";
import HomePage from "../HomePage/HomePage";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import CampgroundPage from "../CampgroundPage/CampgroundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/:campgroundId" element={<CampgroundPage />} />
      </Switch>
    </Router>
  );
}

export default App;
