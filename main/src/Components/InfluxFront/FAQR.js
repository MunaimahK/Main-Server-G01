import React from "react";
import "./FAQR.css";
import "boxicons";
import { useState, useEffect } from "react";
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
const FAQR = () => {
  const [activeLink, setActiveLink] = useState("FAQ");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsNavVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div class="main-pg-FAQ">
      <header class="header-front">
        <a href="/influx" class="logo">
          Influx
        </a>
        <nav className={isNavVisible ? "navbar" : "navbar hidden"}>
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
      <section class="home-faq">
        <div class="home-content-faq">
          <ul>
            {" "}
            <div className="q-box">
              <li className="question">
                {" "}
                How can I use Influx for my club/organization?
              </li>
              <li className="answer">
                Currently, we are only working with Hack@UCF and KnightHacks. We
                will be expanding to include more clubs/organizations with
                Influx V2 so stay tuned!
              </li>
            </div>
            <div className="q-box">
              <li className="question">
                How is Influx different from KnightConnect?
              </li>
              <li className="answer">
                KnightConnect does not provide members and admins with a
                centralized platform to use for all their organization needs.
                Influx provides a unified platform where admins can verify
                attendance, have members pay dues, fill out sign up questions,
                etc.
              </li>
            </div>
            <div className="q-box">
              {" "}
              <li className="question">What technologies does Influx use?</li>
              <li className="answer">
                Here are a few of the technologies that were used to put Influx
                together: Docker, Postman for API testing, mongoDB, Stripe for
                dues payments, and AWS for our cloud service.
              </li>
            </div>
            <div className="q-box">
              <li className="question">
                What are some things that will be added to Influx V2?
              </li>
              <li className="answer">
                We would like to implement backlogged functionalities such as
                events, election/poll systems, and making Influx a mobile
                application. These features along with horizontal scaling will
                make it capable to add more clubs/organizations to Influx.
              </li>
            </div>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default FAQR;
