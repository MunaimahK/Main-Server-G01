import Placeholder from "./user.png";
import "./Dashboard.css";
import React from "react";
import axios from "axios";
import logo from "./influx-logo.png";

const AdminNav = () => {
  const logOut = async () => {
    try {
      const data = await axios.get("/logout").then((res) => {
        console.log(res);
        window.location.replace("/admin/login");
      });
    } catch (err) {
      console.log(err);
    }
  };
  const defaultAdmin = () => {
    axios.post("/admin");
  };
  return (
    <nav>
      <div className="logo">
        <a href="/" className="logo" />
        <img src={logo} id="logo" />
      </div>

      <div>
        <ul className="nav-bar">
          <li>
            <a href="/dashboard">Influx</a>
          </li>
          <li>
            <a href="/admin">Home</a>
          </li>
          <li>
            <button onClick={logOut}>Log Out</button>
          </li>
          <li>
            <img className="profile-img" src={Placeholder} alt="c1-logo"></img>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
