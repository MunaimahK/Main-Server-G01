import "./Cards.css";
import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Model from "react-modal";

import { useParams } from "react-router-dom";
import ClubStats from "./ClubStats";

import { toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RenderDueStats from "./RenderDueStats";
import CustomQForm from "./CustomQForm";

const Cards = (props) => {
  const navigate = useNavigate();
  const [Dues, setDues] = useState("no");
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [data, setData] = useState({
    name: "",
    major: "",
    gradDate: "",
    clubName: "",
  });
  const [payment, setPayment] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);

  const basicQ = async (e) => {
    const backend_url = props.redirect_b;
    const frontend_url = props.redirect;
    console.log("BACKEND URL: ", backend_url);
    console.log("FRONTED URL: ", frontend_url);
    axios.defaults.withCredentials = true;
    e.preventDefault();
    const { name, major, gradDate, clubName } = data;
    const clubTitle = props.title;
    try {
      const { data } = await axios
        .post(
          "http://localhost:3001/one-time-signup",
          {
            name,
            major,
            gradDate,
            clubTitle,
            backend_url,
          },
          true
        )
        .then(async (res) => {
          if (res.data.error) {
            console.log("Already added");
            setOpen(false);
          } else {
            console.log("FETCHING");
            fetchQuestions();
            // first time club's custom questions are checked here:
            try {
              const cQ = await axios
                .get("/retrieve-custom-q", { backend_url })
                .then((res) => {
                  console.log(res);
                });
            } catch (error) {
              console.log(error);
            }

            if (!frontend_url) {
              console.log(frontend_url);
            }
            // window.location.replace(frontend_url);
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

    // setOpenC(true);
    setOpen(false);
  };
  const fetchQuestions = async () => {
    try {
      const backend_url = props.redirect_b;
      // const backend_url = "http://localhost:8000";
      const response = await axios.get("/retrieve-custom-q", {
        params: { backend_url },
      });
      console.log(backend_url);
      // setQuestions(response.data);
      if (response.data.length > 0) {
        setOpenC(true);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const joinClub = async (req, res) => {
    // setOpenC(true);
    const cardTitle = props.title;
    const redirect = props.redirect;
    // const redirect_b = props.redirect_b;

    console.log("from props", cardTitle);

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
            console.log("RES ERROR", res.data.error);

            console.log("is this an array", Array.isArray(res.data.clubName));
            let i = 0;
            let clubTitle = "";
            if (res.data.clubName.length === 0) {
              setOpen(true);
            }
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
                try {
                  fetchQuestions((res) =>
                    console.log("RES FROM FETCH:", res)
                  ).then(window.location.replace(`${redirect}`));
                } catch (err) {
                  console.log(err);
                }
                //  window.location.replace(`${redirect}`);
                setOpen(false);

                // break;
              } else {
                try {
                  fetchQuestions();
                } catch (err) {
                  console.log(err);
                }
                // setOpen(true);
                console.log("Club Not Enrolled");
                toast({ error: "Club Not Enrolled" });
                // This is where we now ask for custom questions if any
                // If there isn't then just borrow info from the other club
                // first borrow questiosn from the mains erver user clubs[0] info object
                // then send custom questions to main server
                // then redirect
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

  const prevStat = stats.map((stat) => (
    <ClubStats clubName={props.title} paidDues={Dues} />
  ));
  // <div>{stats.length === 0 ? <div></div> : <div>{prevStat}</div>}</div>
  const submitQ = async (e) => {
    const backend_url = props.redirect_b; //localhost:8000";
    axios.defaults.withCredentials = true;
    //  const answers = data;
    e.preventDefault();
    console.log("SUBMITQ");
    console.log(questions);
    try {
      const send = await axios
        .get("/update-answers-send", {
          params: {
            backend_url,
            questions,
          },
        })
        .then((res) => {
          console.log(res.data.msg);
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
            {
              <div>
                {stats.length === 0 ? <div></div> : <div>{prevStat}</div>}
              </div>
            }
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
        <form onSubmit={submitQ}>
          {openC && <CustomQForm backend_url={props.redirect_b} />}
          <button type="submit">SUBMIT</button>
        </form>
      </Model>
    </div>
  );
};

export default Cards;
