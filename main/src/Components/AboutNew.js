import React from "react";
import "./AboutNew.css";
import Dashboard from "./Dashboard";

const AboutNew = () => {
  return (
    <div className="w">
      <Dashboard />
      <div className="about-container">
        <div className="about-content">
          <a href="http://localhost:3000/dashboard">
            <i class="arrow left"></i>
          </a>
          <h2>About Influx!</h2>
          <p>
            Influx is a true one-stop shop for registered student organizations
            at UCF.
          </p>
          <p>
            Influx strives to create a seamless dashboard and flow for students
            (both members and admins) to use for various organizations at UCF.
          </p>
          <p>
            Influx’s aim is to simplify the process for students to join and
            engage with registered student organizations at UCF. There are many
            challenges faced by both students and organizations when using
            KnightConnect such as the cumbersome nature of it and lack of a
            centralized platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutNew;
