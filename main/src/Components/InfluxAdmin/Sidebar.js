import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsArrowLeftSquareFill,
} from "react-icons/bs";
import logo from "./influx-logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaArrowAltCircleLeft } from "react-icons/fa";

const Sidebar = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const logOut = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    try {
      await axios.get("/logout", {}, { withCredentials: true }).then((res) => {
        console.log(res);
        navigate("/admin/login");
      });
    } catch (err) {
      console.log(err);
    }
    // navigate("/admin/login");
  };
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src={logo} className="img-logo-sidebar" />
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/admin" className="hover-text">
            <BsGrid1X2Fill className="Icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/admin/add/club">
            <BsFillGrid3X3GapFill className="Icon" /> Register Club
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/member/promote/admin">
            <BsPeopleFill className="Icon" /> Promote Admin
          </a>
        </li>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="Icon" /> Settings
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/admin/login">
            <BsArrowLeftSquareFill className="Icon" onClick={logOut} /> Log Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
