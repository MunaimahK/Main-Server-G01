import React from "react";
import "./ClubStats.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const ClubStats = (props) => {
  const [paidDues, setPaidDues] = useState("NOT");
  const backend = props.backend_url;
  const frontend = props.frontend_url;
  const name = props.title;
  const checkPaid = async () => {
    try {
      const data = await axios
        .get("/check-stats-per-club", {
          params: {
            backend,
          },
        })
        .then((res) => {
          console.log("In CheckPaid in Club Stats", res.data.msg);
          if (res.data.msg) {
            setPaidDues("");
          }
          console.log("check stats", res);
        });
      /* const data = await axios.get("/test/test").then((res) => {
        // console.log("In CheckPaid in Club Stats", res.data.paidDues);
        setPaidDues("");
      });*/
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkPaid();
  }, [props]); // Include props in the dependency array to re-fetch data when props change

  return (
    <div className="wrapper-stats">
      <Box>
        {" "}
        <Typography variant="body2" color="text.secondary">
          <div className="box-dues"> You have {paidDues} Paid Your Dues</div>
        </Typography>
      </Box>
    </div>
  );
};

export default ClubStats;
