import React from "react";
import axios from "axios";
import Cards from "../ClubCard/Cards";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CardM from "../ClubCard/CardM";
const RenderControllers = () => {
  let i = 0;

  const [enrolledClubList, setEnrolledClubList] = useState([]);
  const [clubs, setClubs] = useState([{ ClubName: "Test" }]);
  const [userEnrolled, setUserEnrolled] = useState(false);

  useEffect(() => {
    axios
      .get("/controllers")
      .then((response) => {
        console.log("RES:", response);
        setClubs(response.data);
        if (response.data) {
          for (i = 0; i < response.data.length; i++) {
            checkEnrolled(response.data[i]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const checkEnrolled = async (club) => {
    try {
      const data = await axios.get("/isEnrolled", { club }).then((res) => {
        console.log("CHECK ENROLLED IN RENDER", res.data.error);
        for (i = 0; i < res.data.clubName.length; i++) {
          // yields the names of the clubs this user is enrolled in.
          // append to an array
          console.log(
            "CHECK ENROLLED RES IN RENDER",
            res.data.clubName[i].clubName
          );
          setEnrolledClubList(res.data.clubName);
          console.log("enrolledClublist", enrolledClubList);
        }
        // console.log("CHECK ENROLLED RES IN RENDER", res.data.clubName);
        //   setUserEnrolled(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

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
            enrolled={enrolledClubList}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RenderControllers;
