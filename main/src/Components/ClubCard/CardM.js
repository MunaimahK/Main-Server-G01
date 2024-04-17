import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardButton from "./CardButton";
import { useState, useEffect } from "react";
import axios from "axios";
import ClubStats from "./ClubStats";

const CardM = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "25px",
        transition: "transform 0.3s",
        boxShadow: "2px 4px 8px 4px rgba(9,21,54, 0.2)",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 4px 8px 4px rgba(9,21,54, 0.4)",
        },
        backgroundColor: "#f6f6f6",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={props.img}
        alt="Club Logo"
        sx={{ borderRadius: "10px" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.text}
        </Typography>
        <ClubStats
          backend_url={props.redirect_b}
          frontend_url={props.redirect}
          title={props.title}
          enrolled={props.enrolled}
        />
        <CardButton
          backend_url={props.redirect_b}
          frontend_url={props.redirect}
          title={props.title}
          enrolled={props.enrolled}
        />
      </CardContent>
    </Card>
  );
};
export default CardM;
