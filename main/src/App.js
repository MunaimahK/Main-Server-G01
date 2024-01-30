import "./App.css";
import placeholderLogo from "./Components/location-pin.png";
import Login from "./Components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Redirect } from "react-router-dom";
//import Dashboard from "./Components/Dashboard";
import Cards from "./Components/Cards";
import Dashboard from "./Components/Dashboard";
import Admin from "./Components/Admin.js";
import AdminSignUp from "./Components/AdminSignUp.js";
import AdminLogin from "./Components/AdminLogin.js";
import About from "./Components/About.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/signup" element={<AdminSignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
              <div className="card-container">
                <Cards
                  link="https://knightconnect.campuslabs.com/engage/organization/4everknights"
                  img={placeholderLogo}
                  title="Controller1"
                  text="Description about C1@UCF"
                />
                <Cards
                  link="https://knightconnect.campuslabs.com/engage/organization/acducf"
                  img={placeholderLogo}
                  title="Controller2"
                  text="Description about C2@UCF"
                />
                <Cards
                  link="https://knightconnect.campuslabs.com/engage/organization/aiaa"
                  img={placeholderLogo}
                  title="Controller3"
                  text="Description about C3@UCF"
                />
              </div>
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
