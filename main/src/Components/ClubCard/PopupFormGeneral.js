import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";

const PopupFormGeneral = (props) => {
  const backend_url = props.backend_url;
  const frontend_url = props.frontend_url;
  const clubTitle = props.title;
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([{}]);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    nid: "",
    gender: "",
    major: "",
    classStanding: "",
  });
  const fetchQuestions = async () => {
    try {
      const response = await axios
        .get("/retrieve-custom-q", {
          params: { backend_url },
        })
        .then((res) => {
          console.log("Retrieved C Questions:", res);
          setQuestions(res.data);
        });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleClickOpen = () => {
    if (props.status) setOpen(true);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const {
      firstName,
      surname,
      email,
      nid,
      gender,
      major,
      classStanding,
    } = formData;
    const submit = await axios
      .post(
        "http://localhost:3001/one-time-signup",
        {
          firstName,
          surname,
          email,
          nid,
          gender,
          major,
          classStanding,
          backend_url,
          frontend_url,
          clubTitle,
        },
        true
      )
      .then(async (res) => {
        console.log(res);
      });
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

    window.location.replace(`${frontend_url}`);
    setOpen(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleInputChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginTop: "2vh", width: "100%", left: "0" }}
      >
        Club Enrollment Form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>General Questions</DialogTitle>
        <DialogContent>
          <form
            className="form"
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
            type="submit"
          >
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="surname"
              label="Surname"
              type="text"
              fullWidth
              value={formData.surname}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="nid"
              label="NID"
              type="text"
              fullWidth
              value={formData.nid}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="gender"
              label="Gender"
              type="text"
              fullWidth
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="major"
              label="Major"
              type="text"
              fullWidth
              value={formData.major}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="classStanding"
              label="Class Standing"
              type="text"
              fullWidth
              value={formData.classStanding}
              onChange={handleChange}
            />
            <div>
              {questions.map((q, index) => (
                <TextField
                  key={q.id}
                  autoFocus
                  margin="dense"
                  id={`q.id-${index}`}
                  label={q.question}
                  type="text"
                  fullWidth
                  value={q.answer}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupFormGeneral;
