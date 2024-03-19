import "./Cards.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Model from "react-modal";

import { useParams } from "react-router-dom";
import ClubStats from "./ClubStats";

import { toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Dues, setDues] = useState("No");
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
            /*
            if (clubName === "KnightHacks") {
              window.location.replace("http://localhost:3002/");
            } else if (clubName === "Hack@UCF") {
              window.location.replace("http://localhost:8000");
            } else {
              window.location.replace("http://localhost:3000");
            }*/
          }
        });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Succesful. Welcome!");
      }
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };
  const joinClub = async (req, res) => {
    const cardTitle = props.title;
    const redirect = props.redirect;
    const redirect_b = props.redirect_b;

    console.log(cardTitle);

    if (req) {
      console.log("REQUEST", req);
    }
    try {
      const call = await axios
        .get("http://localhost:3001/isEnrolled")
        .then(async (res) => {
          console.log(res);
          console.log("Before if:", res.data.error);
          if (res.data.error) {
            console.log(res.data.error);

            console.log("is this an array", Array.isArray(res.data.clubName));
            let i = 0;
            let clubTitle = "";
            // Go through the clubs array for this user. If the user is enrolled in teh club the card button represents, visit
            // If not, check for custom Q's and then update enrollment
            for (i = 0; i < res.data.clubName.length; i++) {
              clubTitle = res.data.clubName[i].clubName;
              console.log(clubTitle);
              console.log("type clubTitle: ", typeof clubTitle);
              console.log("type cardTitle: ", typeof cardTitle);
              console.log(
                "Are they equal?: ",
                clubTitle.toString() === cardTitle.toString()
              );
              console.log("cardTitle: ", cardTitle);
              console.log("clubTitle: ", clubTitle);

              if (clubTitle === cardTitle.toString()) {
                console.log("title props: ", clubTitle);
                console.log("title props: ", cardTitle);
                window.location.replace(`${redirect}`);
                setOpen(false);
                // break;
              } else {
                // setOpen(true);
                console.log("Club Not Enrolled");
                toast({ error: "Club Not Enrolled" });
                // This is where we now ask for custom questions if any
                // If there isn't then just borrow info from the other club

                try {
                  const x = await axios
                    .post("/retrieve-custom-q", { redirect_b }, true)
                    .then((res) => {
                      console.log("Connected:", res.data.stat);
                      console.log("Will be redirected to:", res.data.r);
                    });
                } catch (err) {
                  console.log(err);
                }
              }
            }
          } else {
            //if (true) {
            setOpen(true);
            /*} else {
              try {
                const x = await axios
                  .post("/retrieve-custom-q", { redirect_b }, true)
                  .then((res) => {
                    console.log("Connected:", res.data.stat);
                    console.log("Will be redirected to:", res.data.r);
                  });
              } catch (err) {
                console.log(err);
              }
            }*/

            // joinClub();
            console.log(res.data.error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  /*
  const joinClub = async (title) => {
    //  e.preventDefault();
    console.log("title props: ", props.title);
    const cardTitle = props.title;
    const redirect = props.redirect;
    const redirect_b = props.redirect_b;
    
    try {
      const call = await axios
        .get("http://localhost:3001/isEnrolled")
        .then(async (res) => {
          console.log(res);
          if (res.data.error) {
            console.log(res.data.error);
            console.log(res.data.clubName);
            console.log("is this an array", Array.isArray(res.data.clubName));
            let i = 0;
            let clubTitle = "";
            // Go through the clubs array for this user. If the user is enrolled in teh club the card button represents, visit
            // If not, check for custom Q's and then update enrollment
            for (i = 0; i < res.data.clubName.length; i++) {
              clubTitle = res.data.clubName[i].clubName;
              console.log(clubTitle);
              console.log("type clubTitle: ", typeof clubTitle);
              console.log("type cardTitle: ", typeof cardTitle);
              console.log(
                "Are they equal?: ",
                clubTitle.toString() === cardTitle.toString()
              );
              console.log("cardTitle: ", cardTitle);
              console.log("clubTitle: ", clubTitle);

              if (clubTitle === cardTitle.toString()) {
                console.log("title props: ", clubTitle);
                console.log("title props: ", cardTitle);
                window.location.replace(`${redirect}`);
                setOpen(false);
                // break;
              } else {
                setOpen(true);
                console.log("Club Not Enrolled");
                toast({ error: "Club Not Enrolled" });
                // This is where we now ask for custom questions if any
                // If there isn't then just borrow info from the other club

                // const x = await axios.get(`${redirect}/retrieve-custom-q`);
                try {
                  const x = await axios
                    .post("/retrieve-custom-q", { redirect_b }, true)
                    .then((res) => {
                      console.log("Connected:", res.data.stat);
                      console.log("Will be redirected to:", res.data.r);
                    });
                } catch (err) {
                  console.log(err);
                }
              }
            }
          } else if (!res.data.error) {
            // setOpen(true);
            // joinClub();
            console.log(res.data.error);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // Make an API call to retrieve if the user string "clubs" is popualted. If so, setOpen(false) == setOpen(!API Return)
  };*/
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

  const dues = async () => {
    try {
      const clubName = props.title;
      console.log("ClubName", clubName);
      const duesBool = await axios
        .post("http://localhost:3001/check-dues", {
          clubName,
        })
        .then((res) => {
          console.log(res.data.error);
          // setDues("true");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <img className="card-img" src={props.img} alt="c1-logo"></img>
      <h2 className="card-title">{props.title}</h2>
      <p className="card-text">{props.text}</p>

      <div>
        {stats.length === 0 ? (
          <div></div>
        ) : (
          <div>
            <button onClick={dues}>Paid Dues Yet?</button>
            {stats.map((stat) => (
              <ClubStats clubName={props.title} paidDues={Dues} />
            ))}
          </div>
        )}
      </div>

      <button className="btn" type="submit" onClick={() => joinClub()}>
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
