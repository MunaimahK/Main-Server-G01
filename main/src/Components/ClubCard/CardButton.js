import React from "react";
import { Button } from "@mui/material";

const CardButton = () => {
  const joinClub = () => {
    alert("Club Joined");
  };
  return (
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
      onClick={joinClub}
    >
      Let's Go!
    </Button>
  );
};

export default CardButton;
