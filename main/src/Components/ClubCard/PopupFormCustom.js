import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";

const PopupFormCustom = (props) => {
  const backend_url = props.backend_url;
  const frontend_url = props.frontend_url;
  const clubTitle = props.title;
  const clubLender = props.clubLender;
  const clubLenderURL = props.clubLender;
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    /* borrow*/
    console.log("pre BORROW");
    const borrow = await axios
      .get("/borrow-general-questions", {
        params: { clubLenderURL, backend_url },
      })
      .then(async (res) => {
        console.log("BORRW:", res.data.msg);

        // update main user's clubs []
      });

    try {
      const update = await axios
        .get("/update-clubs-enrolled", {
          params: { clubTitle, frontend_url, backend_url },
        })
        .then((res) => {
          console.log(res.data.msg);
          //fetchQuestions();
        });
    } catch (err) {
      console.log(err);
    }

    /* Add Custom Answer Response */
    console.log("POST BORROW");
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
  const fetchQuestions = async () => {
    console.log("FETCH");
    console.log(clubLender);

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

  const handleInputChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginTop: "2vh", width: "100%", left: "0" }}
      >
        Answer Custom Questions
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Custom Questions</DialogTitle>
        <DialogContent>
          <form
            className="form"
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
            type="submit"
          >
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

export default PopupFormCustom;
