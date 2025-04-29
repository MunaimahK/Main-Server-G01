import React from "react";
import { ChevronFirst } from "lucide-react";
import logo from "./influx-logo.png";
import "./AdminNavR.css";

import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
