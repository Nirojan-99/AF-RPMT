import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserData(props) {
  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  const request = () => {
    axios
      .put(
        `${URL}groups/${props.data._id}/Student/${userID}`,
        {},
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        toast("Request sent to " + props.data.name, { type: "success" });
      })
      .catch((er) => {
        toast("Unable to send request, try again", { type: "error" });
      });
  };

  return (
    <>
      <ToastContainer />
      <Box my={1} mx={2} p={1.2} px={2} bgcolor="#eee" borderRadius={1}>
        <Grid
          container
          direction={"row"}
          justifyContent="start"
          alignItems={"center"}
        >
          <Grid item xs={7} sm={4}>
            <Grid
              container
              justifyContent={"start"}
              spacing={1}
              alignItems="center"
            >
              <Grid item>
                <Avatar src="" alt="dp">
                  {props.data.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justifyContent={"start"}
                  direction="column"
                  alignItems={"start"}
                >
                  <Grid>
                    <Typography variant="h4" sx={{ color: "#0C4D82" }}>
                      {props.data.name}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Grid
                      item
                      display={{ xs: "block", sm: "none" }}
                      sx={{ color: "#333" }}
                    >
                      <Typography variant="h4">
                        {props.data.research_Field}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={0}
            sm={4}
            display={{ xs: "none", sm: "block", textAlign: "left" }}
          >
            <Typography sx={{ color: "#333", fontSize: 15 }}>
              {props.data.research_Field}
            </Typography>
            <Typography sx={{ color: "#333", fontSize: 15 }}>
              {props.data.research_Topic.name}
            </Typography>
          </Grid>
          <Grid item sm={4} xs={5} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              disableElevation
              color="secondary"
              onClick={request}
            >
              <Typography variant="subtitle2">Request</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserData;
