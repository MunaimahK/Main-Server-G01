import React from "react";
import axios from "axios";
import Cards from "./Cards";
import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
const RenderControllers = () => {
  const [clubs, setClubs] = useState([
    { ClubName: "Test" },
  ]); /*
  const getControllers = async (req, res) => {
    try {
      const data = await axios.get("/controllers").then((res) => {
        console.log(res.data.msg);
        setClubList(res.data.msg);
        console.log("CLUBS: ", clubs);

      });
    } catch (err) {
      console.log(err);
    }
  };*/

  useEffect(() => {
    axios
      .get("/controllers")
      .then((response) => {
        console.log("RES:", response);
        setClubs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const clubComponent = clubs.map((club, index) => (
    

      <Cards
      title={club.name}
      text={club.text}
      img={club.logo}
      redirect={club.frontend}
      redirect_b={club.backend}
    />
    
  ));

  return <div>{clubComponent}</div>;
};

export default RenderControllers;
