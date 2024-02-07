import "./Cards.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cards = (props) => {
  const navigate = useNavigate();
  const joinClub = async (e) => {
    e.preventDefault();
   // navigate(`/${props.redirect}`);
   // navigate('http://localhost:3002/mainpage');
  };

  return (
    <div className="card">
      <a href={props.link} className="link-to-controller">
        <img className="card-img" src={props.img} alt="c1-logo"></img>
        <h2 className="card-title">{props.title}</h2>
        <p className="card-text">{props.text}</p>
      </a>
      <button className="btn" type="submit" onClick={joinClub}>
        {props.title}
      </button>
    </div>
  );
};

export default Cards;
