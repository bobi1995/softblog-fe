import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { User } from "../pages/User";
import Navbar from "../components/Navbar";
const MainRoute = () => {
  // TODO replace ALL window.location.href + href="..." with location and navigate checks and calls
  // so the pages don't refresh and things, we lose context like this
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default MainRoute;
