import Placeholder from "./user.png";
import "./Dashboard.css";
import React from "react";
import axios from "axios";

const Dashboard = () => {
  const defaultAdmin = () => {
    axios.post("/admin");
  };
  return (
    <nav>
      <a href="/" className="logo"></a>
      <div>
        <ul className="nav-bar">
          <li>
            <a className="active" href="/about">
              About
            </a>
          </li>
          <li>
            <a href="/">Clubs</a>
          </li>
          <li>
            <a href="/">FAQ</a>
          </li>
          <li>
            <a href="/admin/login" onClick="defaultAdmin()">
              Admin
            </a>
          </li>
          <li>
            <img className="profile-img" src={Placeholder} alt="c1-logo"></img>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Dashboard;
