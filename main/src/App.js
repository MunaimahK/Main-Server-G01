import "./App.css";
import placeholderLogo from "./Components/location-pin.png";
import Login from "./Components/Recycle/Login.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Redirect } from "react-router-dom";
//import Dashboard from "./Components/Dashboard";
import axios from "axios";
import Cards from "./Components/ClubCard/Cards.js";
import Dashboard from "./Components/Recycle/Dashboard.js";
import Admin from "./Components/Recycle/Admin.js";
import AdminSignUp from "./Components/Recycle/AdminSignUp.js";
import AdminLogin from "./Components/Recycle/AdminLogin.js";
import { UserContextProvider } from "./Components/context/userContext.js";
import DuesStats from "./Components/ClubCard/DuesStats.js";
import AboutNew from "./Components/Recycle/AboutNew.js";
import FAQ from "./Components/Recycle/FAQ.js";
import AddClub from "./Components/Recycle/AddClub.js";
import RenderControllers from "./Components/InfluxDashboard/RenderControllers.js";
import FrontPage from "./Components/InfluxFront/FrontPage.js";
import AboutR from "./Components/InfluxFront/AboutR.js";
import FAQR from "./Components/InfluxFront/FAQR.js";
import DashboardR from "./Components/InfluxDashboard/DashboardR.js";
import AdminSignAndRegister from "./Components/AdminAccount/AdminSignAndRegister.js";
import ForgotPWD from "./Components/AdminAccount/ForgotPWD.js";
import AddClubR from "./Components/InfluxAdmin/AddClubR.js";
import AdminDashboard from "./Components/InfluxAdmin/AdminDashboard.js";
import PromoteAdmin from "./Components/InfluxAdmin/PromoteAdmin.js";

// Knight Hacks img 1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHZlnuvnNWPsSs-9iltSdMx3fEjByztOWDgsNdVLPlDZjTUMyuRwRonlvENldynzVEzA&usqp=CAU"
// Knight Hacks img 2 = https://avatars.githubusercontent.com/u/11686531?s=200&v=4
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/influx" element={<FrontPage />}></Route>
        <Route
          path="/about/us/influx/senior/deign/24"
          element={<AboutR />}
        ></Route>
        <Route
          path="/influx/senior/deign/24/frequently-asked"
          element={<FAQR />}
        ></Route>

        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/forget/password" element={<ForgotPWD />}></Route>
        <Route path="/admin/login" element={<AdminSignAndRegister />}></Route>
        <Route path="/admin/signup" element={<AdminSignUp />}></Route>
        <Route path="/about" element={<AboutNew />}></Route>
        <Route path="/influx/faq" element={<FAQ />}></Route>
        <Route path="/admin/add/club" element={<AddClubR />}></Route>
        <Route path="/promote/user/to/admin" element={<PromoteAdmin />}></Route>
        <Route
          path="/see/all/controllers"
          element={<RenderControllers />}
        ></Route>

        <Route
          path="/dashboard"
          element={
            <>
              <DashboardR />
            </>
          }
        />
        <Route path="/dashboard" element={<DashboardR />} />
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
/*<div className="card-container">
                <Cards
                  link="http://localhost:3002/"
                  img={
                    "https://avatars.githubusercontent.com/u/11686531?s=200&v=4"
                  }
                  title="KnightHacks"
                  text="Join the Hackathon!"
                  redirect="http://localhost:3002/"
                  redirect_b="http://localhost:8000"
                />
                <Cards
                  link="https://knightconnect.campuslabs.com/engage/organization/acducf"
                  img={
                    "https://pbs.twimg.com/profile_images/1318731511785377792/4lXV4K-c_400x400.jpg"
                  }
                  title="Hack@UCF"
                  text="Hi Cybersecurity"
                  redirect="http://localhost:3003"
                  redirect_b="http://localhost:8001"
                />
              </div> */
export default App;
