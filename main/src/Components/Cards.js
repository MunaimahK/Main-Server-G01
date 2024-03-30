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
  const [Dues, setDues] = useState("No");
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openC2, setOpenC2] = useState(false);
  // these are the general questions:
  // First Name
  // Surname
  // Preferred Email
  // NID
  // Gender
  // Major
  // Class Standing (by credit hours)
  /* const [data, setData] = useState({
    name: "",
    major: "",
    gradDate: "",
    clubName: "",
  });*/
  const [data, setData] = useState({
    f_name: "",
    surname: "",
    email: "",
    NID: "",
    gender: "",
    major: "",
    classStanding: "",
  });
  const [payment, setPayment] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const backend_url = props.redirect_b;
  // const backend_url = "http://localhost:8000";
  const fetchQuestions = async () => {
    try {
      const response = await axios
        .get("/retrieve-custom-q", {
          params: { backend_url },
        })
        .then((res) => {
          console.log("Retrieved C Questions:", res);
          setQuestions(res.data);
          setOpenC(true);
          setOpenC2(true);
        });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const basicQ = async (e) => {
    const backend_url = props.redirect_b;
    const frontend_url = props.redirect;
    console.log("BACKEND URL: ", backend_url);
    console.log("FRONTED URL: ", frontend_url);
    axios.defaults.withCredentials = true;
    e.preventDefault();
    // const { name, major, gradDate, clubName } = data;
    const { f_name, surname, email, NID, Gender, major, classStanding } = data;
    const clubTitle = props.title;
    try {
      const { data } = await axios
        .post(
          "http://localhost:3001/one-time-signup",
          {
            /*
            name,
            major,
            gradDate,
            clubTitle,
            backend_url,
            frontend_url,*/
            f_name,
            surname,
            email,
            NID,
            Gender,
            major,
            classStanding,
            backend_url,
            frontend_url,
            clubTitle,
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

    setOpen(false);
    setOpenC(true);
  };

  const joinClub = async (req, res) => {
    setOpen(true);
    setOpenC(true);
    const backend_url = props.redirect_b;
    const frontend_url = props.redirect;
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
                setOpen(false);
                // let's borrow from the first club in the array:
                const borrowFrom = res.data.clubName[0].redirect_b;
                const isBorrowing = props.redirect_b;
                const newC = props.title;
                const borrow = await axios
                  .get("/borrow-general-questions", {
                    params: { borrowFrom, isBorrowing },
                  })
                  .then(async (res) => {
                    console.log("BORRW:", res);
                    // update main user's clubs []
                    try {
                      const update = await axios
                        .get("/update-clubs-enrolled", {
                          params: { newC, frontend_url, backend_url },
                        })
                        .then((res) => {
                          console.log(res.data.msg);
                          fetchQuestions();
                        });
                    } catch (err) {
                      console.log(err);
                    }
                  });

                try {
                  fetchQuestions();
                } catch (err) {
                  console.log(err);
                }
                // setOpen(true);
                // setOpenC2(true);
                console.log("Club Not Enrolled");
                // toast({ error: "Club Not Enrolled" });

                // fetchQuestions();
                // This is where we now ask for custom questions if any
                // If there isn't then just borrow info from the other club
                // first borrow questiosn from the mains erver user clubs[0] info object
                // then send custom questions to main server
                // then redirect
              }
            }
          } else {
            setOpen(true);

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
  //const [questions, setQuestions] = useState([{}]);
  const [data2, setData2] = useState({
    submit: "",
  });
  // const [open, setOpen] = useState(true);
  const checkStats = () => {
    const b_url = props.redirect_b;
    axios
      .get("/check-stats-per-club", { params: { b_url } })
      .then((response) => {
        console.log("RES IN STATS:", response);
        //const updatedDues = { ...Dues };
        // updatedDues[b_url] = response.data.msg ? "Yes" : "No";
        setDues(response.data.msg.toString());
        /*if (response.data.msg) {
          console.log("RES IN STATS:", response);
          if (response.data.msg === true) {
            setDues("Yes");
          } else {
            setDues("No");
          }
        }*/
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    checkStats();
  }, [props.redirect_b]);

  const submitQ = async (e) => {
    setOpen(false);
    setOpenC(false);
    const backend_url = props.redirect_b;
    // const backend_url = "http://localhost:8000";
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
    // setOpenC(false);
  };

  const handleInputChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
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
                  <label id="l">First Name</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="Hey! What's your first name?"
                    value={data.f_name || ""}
                    onChange={(e) =>
                      setData({ ...data, f_name: e.target.value })
                    }
                  ></input>
                </div>
                <div className="e1">
                  <label id="l">Surname</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="Surname?"
                    value={data.surname || ""}
                    onChange={(e) =>
                      setData({ ...data, surname: e.target.value })
                    }
                  ></input>
                </div>
                <div className="e1">
                  <label id="l">Email</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="Hey! What's your preferred email?"
                    value={data.email || ""}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  ></input>
                </div>
                <div className="e1">
                  <label id="l">NID</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="Alphanumeric NID"
                    value={data.NID || ""}
                    onChange={(e) => setData({ ...data, NID: e.target.value })}
                  ></input>
                </div>
                <div className="e1">
                  <label id="l">Gender</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="gender?"
                    value={data.gender || ""}
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
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
                  <label id="l">Class Standing</label>
                  <br></br>
                  <input
                    id="n"
                    type="text"
                    placeholder="How many cedits have you taken?"
                    value={data.classStanding || ""}
                    onChange={(e) =>
                      setData({ ...data, classStanding: e.target.value })
                    }
                  ></input>
                </div>
              </div>

              <div className="btn-container">
                <button
                  className="reg-btn"
                  type="submit"
                  onClick={() => setOpenC(true)}
                >
                  Continue!
                </button>
              </div>
            </form>

            {openC ? (
              <div>
                <div className="btn-container">
                  <button id="close" onClick={() => setOpenC(false)}>
                    X
                  </button>
                </div>

                {/*questions.map((question, index) => (
                  <div className="e1" key={index}>
                    <label htmlFor={`question.id-${index}`} id="l">
                      {question.question}
                    </label>

                    <input
                      type="text"
                      id={`question.id-${index}`}
                      value={question.answer}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    ></input>

                    <br />
                  </div>
                ))*/}
                <button id="sub" onClick={submitQ}>
                  Submit
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Model>
    </div>
  );
};

export default Cards;
