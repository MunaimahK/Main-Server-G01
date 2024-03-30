import React from "react";
import "./AdminDashboard.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { useState } from "react";

const AdminDashboard = () => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <Home />
    </div>
  );
};

export default AdminDashboard;
