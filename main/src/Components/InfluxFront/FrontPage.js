import React from "react";
import "./FrontPage.css";
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
const FrontPage = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div class="main-pg">
      <header class="header-front">
        <a href="/influx" class="logo">
          Influx
        </a>
        <nav className="navbar">
          <a
            data-tooltip="Just a quick run through Discord OAuth, and then you can join clubs"
            href="https://discord.com/oauth2/authorize?client_id=1179068530273034290&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fdashboard&scope=email+identify"
            className={activeLink === "OAUTH" ? "active" : "avatar"}
            onClick={() => handleLinkClick("OAUTH")}
          >
            Dashboard
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
      <section class="home">
        <div class="home-content">
          <h3> Hey, Welcome to</h3>
          <div className="typed-out">
            <h1> Influx </h1>
          </div>

          <h3>
            {" "}
            Connect to <span class="type">UCF RSOs and Clubs</span>
          </h3>

          <p>The one stop UCF community networking platform</p>
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
        <div className="home-img"></div>
      </section>
    </div>
  );
};

export default FrontPage;
