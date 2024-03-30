import React from "react";
import NavbarR from "./NavbarR";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import RenderControllers from "./RenderControllers";
import "./DashboardR.css";
import { Grid, Container } from "@mui/material";
import AdminNavR from "./AdminNavR";
import "./AdminDashboardR.css";
// <NavbarR show={showNav}/>

const AdminDashboardR = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="screen">
      <AdminNavR />
    </div>
  );
};

export default AdminDashboardR;
