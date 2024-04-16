import React from "react";
import { Button, ButtonBase } from "@mui/material";
import PopupFormGeneral from "./PopupFormGeneral";
import { useState, useEffect } from "react";
import axios from "axios";
import PopupFormCustom from "./PopupFormCustom";

// If this is the first time a member will join the club, then prompt the popup to general and custom form
// If not, then
//    1. Borrow General Question Answers from the other club
//    2. After that prompt the pop up for custom questions
const CardButton = (props) => {
  const [clubState, setClubState] = useState({});
  const Enrolled = props.enrolled;
  console.log("CARD BUTTON PROPS.ENROLLED", props.enrolled);

  const [firstEnrollment, setFirstEnrollment] = useState(true);
  const [firstClub, setFirstClub] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupCustom, setShowPopupCustom] = useState(false);
  const f_url = props.frontend_url;
  const b_url = props.backend_url;
  const c_name = props.title;

  const handleButtonClick = async () => {
    let i = 0;
    if (props.enrolled.length > 0) {
      setFirstEnrollment(false);
      setFirstClub(props.enrolled[0].redirect_b);
      for (i = 0; i < props.enrolled.length; i++) {
        console.log("club name index in carbutton", props.enrolled[i].clubName);
        if (props.enrolled[i].clubName === props.title) {
          console.log("name matches");
          setShowPopupCustom(false);
          window.location.replace(props.frontend_url);
        } else {
          console.log("name does not match");
          setShowPopupCustom(true);
        }
      }
    } else {
      setFirstEnrollment(true);
      setShowPopupCustom(false);
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    // Close the popup
    setShowPopup(false);
    setShowPopupCustom(false);
  };
  const renderButton = () => {
    if (showPopupCustom) {
      return (
        <PopupFormCustom
          status={firstEnrollment}
          onClose={handleClosePopup}
          backend_url={props.backend_url}
          frontend_url={props.frontend_url}
          title={props.title}
          clubLender={firstClub}
        />
      );
    }

    if (showPopup) {
      return (
        <PopupFormGeneral
          status={firstEnrollment}
          onClose={handleClosePopup}
          backend_url={props.backend_url}
          frontend_url={props.frontend_url}
          title={props.title}
        />
      );
    }
  };

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
      <div>{renderButton()}</div>
    </div>
  );
};

export default CardButton;
