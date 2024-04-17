import Placeholder from "./user.png";
import "./Dashboard.css";
import React from "react";
import axios from "axios";
import logo from "./influx-logo.png";
import RenderControllers from "../InfluxDashboard/RenderControllers";

const Dashboard = () => {
  const logOut = async () => {
    try {
      const data = await axios.get("/logout/influx").then((res) => {
        console.log(res);
        window.location.replace("/");
      });
    } catch (err) {
      console.log(err);
    }
  };
  const defaultAdmin = () => {
    axios.post("/admin");
  };
  return (
    <div>
      <nav>
        <div className="logo">
          <a href="/" className="logo" />
          <img src={logo} id="logo" />
        </div>

        <div>
          <ul className="nav-bar">
            <li>
              <a className="active" href="/about">
                About
              </a>
            </li>
            <li>
              <a href="/dashboard">Clubs</a>
            </li>
            <li>
              <a href="/influx/faq">FAQ</a>
            </li>
            <li>
              <a href="/admin/login" onClick="defaultAdmin()">
                Admin
              </a>
            </li>

            <li>
              <button onClick={logOut}>Log Out</button>
            </li>
            <li>
              <img
                className="profile-img"
                src={Placeholder}
                alt="c1-logo"
              ></img>
            </li>
          </ul>
        </div>
      </nav>
      <RenderControllers />
    </div>
  );
};

export default Dashboard;
