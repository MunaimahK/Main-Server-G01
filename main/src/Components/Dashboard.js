import Placeholder from "./user.png";
import "./Dashboard.css";
import React from "react";

const Dashboard = () => {
  return (
    <nav>
      <a href="/" className="logo">
        
      </a>
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
            <a href="/admin/login">Admin</a>
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
