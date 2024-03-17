import "./App.css";
import placeholderLogo from "./Components/location-pin.png";
import Login from "./Components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Redirect } from "react-router-dom";
//import Dashboard from "./Components/Dashboard";
import axios from "axios";
import Cards from "./Components/Cards";
import Dashboard from "./Components/Dashboard";
import Admin from "./Components/Admin.js";
import AdminSignUp from "./Components/AdminSignUp.js";
import AdminLogin from "./Components/AdminLogin.js";
import About from "./Components/About.js";
import { UserContextProvider } from "./Components/context/userContext.js";

// Knight Hacks img 1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHZlnuvnNWPsSs-9iltSdMx3fEjByztOWDgsNdVLPlDZjTUMyuRwRonlvENldynzVEzA&usqp=CAU"
// Knight Hacks img 2 = https://avatars.githubusercontent.com/u/11686531?s=200&v=4
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
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
                  link="http://localhost:3002/"
                  img={
                    "https://avatars.githubusercontent.com/u/11686531?s=200&v=4"
                  }
                  title="Knight Hacks"
                  text="Join the Hackathon!"
                  redirect="http://localhost:3002/"
                />
                <Cards
                  link="https://knightconnect.campuslabs.com/engage/organization/acducf"
                  img={
                    "https://pbs.twimg.com/profile_images/1318731511785377792/4lXV4K-c_400x400.jpg"
                  }
                  title="Hack@UCF"
                  text="Hi Cybersecurity"
                  redirect="/controller2"
                />
              </div>
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/KnightHacks"
          component={() => {
            window.location.href = "https://localhost:3002";
            return null;
          }}
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
