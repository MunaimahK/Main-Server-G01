import React from "react";
import { Button } from "@mui/material";
import PopupFormGeneral from "./PopupFormGeneral";
import { useState, useEffect } from "react";
import axios from "axios";
import PopupFormCustom from "./PopupFormCustom";

// If this is the first time a member will join the club, then prompt the popup to general and custom form
// If not, then
//    1. Borrow General Question Answers from the other club
//    2. After that prompt the pop up for custom questions
const CardButton = (props) => {
  const [firstEnrollment, setFirstEnrollment] = useState(true);
  const [firstClub, setFirstClub] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupCustom, setShowPopupCustom] = useState(false);
  const joinClub = async () => {
    console.log("Join Club");
    try {
      const check = await axios.get("/isEnrolled").then((res) => {
        console.log("Is Enrolled", res.data.error);
        console.log("Is Enrolled", res);
        if (res.data.length > 0) {
          setFirstEnrollment(false);
          setShowPopupCustom(true);
          setFirstClub(res.data.clubName[0]);
        } else {
          // setFirstEnrollment(true);
        }
        // setFirstEnrollment(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    // If it's the first enrollment, render PopupFormGeneral
    // If not, you might want to render something else or nothing
    console.log("FirstEnrollment", firstEnrollment);
    if (firstEnrollment) {
      setShowPopup(true);
    } else {
      setShowPopupCustom(true);
    }
    // Return null or render something else based on your logic
    return null;
  };
  const handleClosePopup = () => {
    // Close the popup
    setShowPopup(false);
    setShowPopupCustom(false);
  };

  useEffect(() => {
    console.log("SHOW CUSTOM:", showPopupCustom);
    console.log("triggered");

    joinClub();
  }, []);
  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#ffa34d",
          "&:hover": {
            backgroundColor: "#20e6c1",
            color: "black",
            boxShadow: "0 2px 4px rgba(9,21,54, 0.4)",
          },
          marginLeft: "0vh",
          marginTop: "2vh",
          width: "100%",
        }}
        variant="contained"
        onClick={() => {
          handleButtonClick();
        }}
      >
        Let's Go!
      </Button>
      {firstEnrollment
        ? showPopup && (
            <PopupFormGeneral
              status={firstEnrollment}
              onClose={handleClosePopup}
              backend_url={props.backend_url}
              frontend_url={props.frontend_url}
              title={props.title}
            />
          )
        : showPopupCustom && (
            <PopupFormCustom
              status={firstEnrollment}
              onClose={handleClosePopup}
              backend_url={props.backend_url}
              frontend_url={props.frontend_url}
              title={props.title}
              clubLender={firstClub}
            />
          )}
    </div>
  );
};

export default CardButton;
