import React from "react";
import { ChevronFirst } from "lucide-react";
import logo from "./influx-logo.png";
import "./AdminNavR.css";

import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import AdminNav from "../Recycle/AdminNav";

const AdminNavR = () => {
  const AdminNavData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/admin",
    },
    {
      title: "Add Clubs",
      icon: <SettingsEthernetIcon />,
      link: "/admin/add/club",
    },
    {
      title: "Promote User",
      icon: <PersonOutlineIcon />,
      link: "/member/promote/admin",
    },
    {
      title: "Logout",
      icon: <ArrowBackIcon />,
      link: "/admin/login",
    },
  ];

  return (
    <div className="screen">
      <div className="sidebar-admin">
        <ul className="sidebar-list">
          {AdminNavData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                  console.log(val);
                  window.location.pathname = val.link;
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminNavR;
