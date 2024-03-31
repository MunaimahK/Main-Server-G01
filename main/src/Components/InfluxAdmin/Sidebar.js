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

const Sidebar = ({ show }) => {
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
    <aside id="sidebar" className={show ? "sidebar active" : "sidebar"}>
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
          <a href="/admin/add/club" className="hover-text">
            <BsFillGrid3X3GapFill className="Icon" /> Register Club
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/promote/user/to/admin" className="hover-text">
            <BsPeopleFill className="Icon" /> Promote Admin
          </a>
        </li>

        <div className="bottom-items">
          {" "}
          <li className="sidebar-list-item">
            <a href="" className="hover-text">
              <BsFillGearFill className="Icon" /> Settings
            </a>
          </li>
          <li className="sidebar-list-item">
            <a href="/admin/login" className="hover-text">
              <BsArrowLeftSquareFill className="Icon" onClick={logOut} /> Log
              Out
            </a>
          </li>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
