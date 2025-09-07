import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "../src/pages/DashBoard"
import MainPage from "./pages/MainPage";
import Profile from "./Components/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
