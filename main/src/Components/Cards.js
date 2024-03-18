import "./Cards.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Model from "react-modal";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ClubStats from "./ClubStats";

const Cards = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    major: "",
    gradDate: "",
    clubName: "",
  });

  const basicQ = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    const { name, major, gradDate, clubName } = data;
    try {
      const { data } = await axios
        .post(
          "http://localhost:3001/one-time-signup",
          {
            name,
            major,
            gradDate,
            clubName,
          },
          true
        )
        .then((res) => {
          if (res.data.error) {
            console.log("Already added");
            setOpen(false);
          } else {
            if (clubName === "KnightHacks") {
              window.location.replace("http://localhost:3002/");
            } else if (clubName === "Hack@UCF") {
              window.location.replace("http://localhost:8000");
            } else {
              window.location.replace("http://localhost:3000");
            }
          }
        });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Succesful. Welcome!");

        // TO DO: Figure out how to redirect to the proper controller based on name/IP
        // hardcoding the value will not work for multiple clubs
        //window.location.replace("http://localhost:3002/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Determines if the pop up form should be opened and if so, which club to redirect to
  const joinClub = async (title) => {
    //  e.preventDefault();
    // Make an API call to retrieve if the user string "clubs" is popualted. If so, setOpen(false) == setOpen(!API Return)
    const data = await axios
      .get("http://localhost:3001/isEnrolled")
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          console.log(res.data.clubName);
          // console.log("Already added");
          setOpen(false);
          // FIX HERE
          // STRING SPLICE THE CLUBNAMES AND MATCH TO CLUB
          if (res.data.clubName === "KnightHacks") {
            console.log(res.data.clubName);
            window.location.replace("http://localhost:3002/");
          } else if (res.data.clubName === "Hack@UCF") {
            // window.location.replace("http://localhost:8000/");
          } else {
            // window.location.replace("http://localhost:8000");
            window.location.replace("http://localhost:3002/");
          }
        } else if (!res.data.error) {
          console.log(res.data.error);
          setOpen(true);
        }
      });
  };

  // Dynamic Component for Club Stats
  const stats = [
    {
      clubName: "clubName",
      paidDues: "Boolean",
    },
  ];

  const statsComponent = stats.map((stat) => (
    <ClubStats clubName={stat.clubName} paidDues={stat.paidDues} />
  ));

  return (
    <div className="card">
      <img className="card-img" src={props.img} alt="c1-logo"></img>
      <h2 className="card-title">{props.title}</h2>
      <p className="card-text">{props.text}</p>

      <div>{stats.length == 0 ? <div></div> : <div>{statsComponent}</div>}</div>

      <button className="btn" type="submit" onClick={joinClub(props.title)}>
        Go to {props.title}
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
                <div className="e1">
                  <label id="l">Club Name</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="Which club would you like to sign up for?"
                    value={data.clubName || ""}
                    onChange={(e) =>
                      setData({ ...data, clubName: e.target.value })
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
