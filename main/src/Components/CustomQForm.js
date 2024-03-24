import React, { useEffect, useState } from "react";
import "./CustomQForm.css";
import axios from "axios";
import Model from "react-modal";

// thsi fiel essentially should be on Main Server as Pop Up
const CustomQForm = (props) => {
  const [questions, setQuestions] = useState([{}]);
  const [data, setData] = useState({
    submit: "",
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const backend_url = props.backend_url;
    // const backend_url = "http://localhost:8000";
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/retrieve-custom-q", {
          params: { backend_url },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const submitQ = async (e) => {
    // const backend_url = props.backend_url;
    const backend_url = "http://localhost:8000";
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

  const handleInputChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };
  return (
    <div>
      <Model
        ariaHideApp={false}
        portalClassName="pop-up-form"
        isOpen={open}
        onRequestClose={() => setOpen(false)}
      >
        <form className="form-c" onSubmit={submitQ}>
          <div className="btn-container">
            <button id="close" onClick={() => setOpen(false)}>
              X
            </button>
          </div>

          {questions.map((question, index) => (
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
          ))}
          <button id="sub" type="submit" onClick={() => setOpen(false)}>
            Submit
          </button>
        </form>{" "}
      </Model>
    </div>
  );
};

export default CustomQForm;
