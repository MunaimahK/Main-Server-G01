import React from "react";
import "./FAQ.css";
import Dashboard from "./Dashboard";

const FAQ = () => {
  return (
    <div className="w">
      <Dashboard />
      <div className="faq-container">
        <div className="faq-content">
          <a href="http://localhost:3000/dashboard">
            <i class="arrow left"></i>
          </a>
          <div className="faq-question">
            How can I use Influx for my club/organization?
          </div>
          <div className="faq-answer">
            Currently, we are only working with Hack@UCF and KnightHacks. We
            will be expanding to include more clubs/organizations with Influx V2
            so stay tuned!
          </div>
          <div className="faq-question">
            How is Influx different from KnightConnect?
          </div>
          <div className="faq-answer">
            KnightConnect does not provide members and admins with a centralized
            platform to use for all their organization needs. Influx provides a
            unified platform where admins can verify attendance, have members
            pay dues, fill out sign up questions, etc.
          </div>
          <div className="faq-question">What technologies does Influx use?</div>
          <div className="faq-answer">
            Here are a few of the technologies that were used to put Influx
            together: Docker, Postman for API testing, mongoDB, Stripe for dues
            payments, and AWS for our cloud service.
          </div>
          <div className="faq-question">
            What are some things that will be added to Influx V2?
          </div>
          <div className="faq-answer">
            We would like to implement backlogged functionalities such as
            events, election/poll systems, and making Influx a mobile
            application. These features along with horizontal scaling will make
            it capable to add more clubs/organizations to Influx.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
