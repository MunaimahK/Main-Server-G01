import "./Cards.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Model from "react-modal";
import toast from "react-hot-toast";

const Cards = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    major: "",
    gradDate: "",
  });

  const redirect = () => {
    navigate("");
  };
  const basicQ = async (e) => {
    e.preventDefault();
    const { name, major, gradDate } = data;
    try {
      // currently sending data to post api in Main Server Backend 3001
      // Try sending data to post api in Controller Backend
      const { data } = await axios.post(
        "http://localhost:3001/one-time-signup",
        {
          name,
          major,
          gradDate,
        },
        true
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Succesful. Welcome!");
        // TO DO: Figure out how to redirect to the proper controller based on name/IP
        // hardcoding the value will not work for multiple clubs
        window.location.replace("http://localhost:3002/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const joinClub = async (e) => {
    e.preventDefault();
    const { name, major, gradDate } = data;

    // TO DO: Implement functionality/condition so Model opens ONLY when user is first time member of ANY Club
    setOpen(true);
  };

  // TO DO: Finish styling Model
  return (
    <div className="card">
      <a href={props.link} className="link-to-controller">
        <img className="card-img" src={props.img} alt="c1-logo"></img>
        <h2 className="card-title">{props.title}</h2>
        <p className="card-text">{props.text}</p>
      </a>
      <button className="btn" type="submit" onClick={joinClub}>
        Join {props.title}
      </button>
      <Model
        ariaHideApp={false}
        portalClassName="pop-up-form"
        isOpen={open}
        onRequestClose={() => setOpen(false)}
      >
        UCF Influx Form
        <div className="container-m">
          <button id="close" onClick={() => setOpen(false)}>
            X
          </button>
          <div className="Container-Form">
            <form onSubmit={basicQ}>
              <div className="Container-Form-Content">
                <div className="e1">
                  <label id="l">Name</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="Hey! What's your name?"
                    value={data.name || ""}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  ></input>
                </div>

                <div className="e1">
                  <label id="l">Major</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="What's your major?"
                    value={data.major || ""}
                    onChange={(e) =>
                      setData({ ...data, major: e.target.value })
                    }
                  ></input>
                </div>

                <div className="e1">
                  <label id="l">Graduation Date</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="When do you graduate?"
                    value={data.gradDate || ""}
                    onChange={(e) =>
                      setData({ ...data, gradDate: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div className="btn-container">
                <button className="reg-btn" type="submit">
                  Join Club!
                </button>
              </div>
            </form>
          </div>
        </div>
      </Model>
    </div>
  );
};

export default Cards;
