import React from "react";
import "./NavbarR.css";
import logo from "./influx-logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// <div className={props.show ? 'sidenav active' : 'sidenav'}>
// m<div className='sidenav active'>
const NavbarR = ({ show }) => {
  const navigate = useNavigate();
  const logOut = async () => {
    console.log("IN LOG OUT");
    try {
      // Sending the logout request
      await axios.get("/logout/influx")
        .then((res) => {
          console.log("LOGOUT SUCCESS", res);
          // After successful logout, navigate to the desired page (influx dashboard or home)
          navigate("/influx");
        })
        .catch((err) => {
          console.log("LOGOUT ERROR", err);
        });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <img src={logo} href="/dashboard" alt="Logo" className="logo" />
      <ul className="nav-ul">
        <li className="nav-li">
          <a className="nav-a" href="/dashboard">
            Home
          </a>
        </li>
        <li className="nav-li">
          <a className="nav-a" href="/admin/login">
            Admin
          </a>
        </li>
        <li className="nav-li">
        <button className="lg-out-button" onClick={logOut}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};
/* <a className="nav-a" onClick="logOut()">
Log Out
</a> */
export default NavbarR;
