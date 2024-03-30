import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const AdminNavData = [
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
