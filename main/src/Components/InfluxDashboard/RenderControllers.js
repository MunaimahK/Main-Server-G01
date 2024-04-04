import React from "react";
import axios from "axios";
import Cards from "../ClubCard/Cards";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CardM from "../ClubCard/CardM";
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
  /*
  const clubComponent = clubs.map((club, index) => (
    <Cards
      title={club.name}
      text={club.text}
      img={club.logo}
      redirect={club.frontend}
      redirect_b={club.backend}
    />
  ));
*/
  return (
    <Grid container spacing={2} sx={{ marginTop: "20px", padding: "20px" }}>
      {clubs.map((club, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <CardM
            title={club.name}
            text={club.text}
            img={club.logo}
            redirect={club.frontend}
            redirect_b={club.backend}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RenderControllers;
