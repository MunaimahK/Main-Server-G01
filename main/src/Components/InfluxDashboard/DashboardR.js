import React from "react";
import NavbarR from "./NavbarR";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import RenderControllers from "./RenderControllers";
import "./DashboardR.css";
import { Grid, Container } from "@mui/material";
// <NavbarR show={showNav}/>

const DashboardR = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="main">
      <header className="header-dashboard">
        <RxHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <FaRegUserCircle
          className="profile-icon"
          onClick={() => {
            console.log("Test");
          }}
        />
      </header>
      <NavbarR show={showNav} />
      <div className={`main-body ${showNav ? "expanded" : ""}`}>
        <Container maxWidth="lg">
          <Grid container spacing={10} style={{ marginTop: "50px" }}>
            <RenderControllers />
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default DashboardR;
