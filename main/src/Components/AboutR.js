import React from "react";
import "./AboutR.css";
import "boxicons";
import { useState } from "react";
// import {icon} from '../Components/assets/7341.jpg'
/*a href="/insta">
              <box-icon class="icon" name="instagram" type="logo"></box-icon>
            </a>
            <a href="/twitter">
              <box-icon class="icon" name="twitter" type="logo"></box-icon>
            </a>
            <a href="/linkedin">
              <box-icon class="icon" name="linkedin" type="logo"></box-icon>
            </a> */
const AboutR = () => {
  const [activeLink, setActiveLink] = useState("About");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div class="main-pg-about">
      <header class="header">
        <a href="/influx" class="logo">
          Influx
        </a>
        <nav className="navbar">
          <a
            href="/influx"
            className={activeLink === "Home" ? "active" : ""}
            onClick={() => handleLinkClick("Home")}
          >
            Home
          </a>
          <a
            href="/about/us/influx/senior/deign/24"
            className={activeLink === "About" ? "active" : ""}
            onClick={() => handleLinkClick("About")}
          >
            About
          </a>
          <a
            href="/influx/senior/deign/24/frequently-asked"
            className={activeLink === "FAQ" ? "active" : ""}
            onClick={() => handleLinkClick("FAQ")}
          >
            FAQ
          </a>
        </nav>
      </header>
      <section class="home-about">
        <div className="vl"></div>
        <div class="home-content-about">
          <h3>What does Influx Do?</h3>
          <p>
            Influx is a true one-stop shop for registered student organizations
            at UCF. Influx strives to create a seamless dashboard and flow for
            students (both members and admins) to use for various organizations
            at UCF. <br></br>
            <span>
              {" "}
              <br></br>
            </span>
            Influx’s aim is to simplify the process for students to join and
            engage with registered student organizations at UCF. There are many
            challenges faced by both students and organizations when using
            KnightConnect such as the cumbersome nature of it and lack of a
            centralized platform.
          </p>
          <h3> Who We Are</h3>

          <p>
            Senior Design G01: Influx Team's robust and modern solution to
            seamless club enrollment. Sponsored by Hack@UCF lead.
          </p>
          <div class="socials">
            <a href="/insta">
              <box-icon class="insta" name="instagram" type="logo"></box-icon>
            </a>
            <a href="/twitter">
              <box-icon class="twitter" name="twitter" type="logo"></box-icon>
            </a>
            <a href="/linkedin">
              <box-icon class="linkedin" name="linkedin" type="logo"></box-icon>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutR;
