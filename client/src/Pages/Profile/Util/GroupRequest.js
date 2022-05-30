import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GroupRequest(props) {
  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  //handle req
  const handleRequest = (status) => {
    axios
      .patch(
        `${URL}groups/${props.data._id}/requests/${props.grp_id}`,
        {
          action: status,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        toast("request successfull handled", { type: "success" });
      })
      .catch((er) => {
        toast("unable to handle the request, try again", { type: "error" });
      });
  };
  return (
    <Box my={1} p={1.2} bgcolor="#eee" borderRadius={3}>
      <ToastContainer />
      <Grid
        container
        direction={"row"}
        justifyContent="start"
        alignItems={"center"}
      >
        <Grid item xs={5} sm={4}>
          <Grid
            container
            justifyContent={"start"}
            spacing={1}
            alignItems="center"
          >
            <Grid item>
              <Avatar src={props.data.dp} alt="dp">
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
                    sx={{ color: "#333", textAlign: "left" }}
                  >
                    <Typography sx={{ color: "#333", fontSize: 12 }}>
                      {props.data.mobile_number}
                    </Typography>
                    <Typography sx={{ color: "#333", fontSize: 12 }}>
                      {props.data.email}
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
          <Typography sx={{ color: "#333", fontSize: 12 }}>
            {props.data.mobile_number}
          </Typography>
          <Typography sx={{ color: "#333", fontSize: 12 }}>
            {props.data.email}
          </Typography>
        </Grid>
        <Grid item sm={4} xs={7}>
          <Grid
            container
            alignItems={"center"}
            justifyContent="end"
            spacing={2}
          >
            <Grid item>
              <Button
                onClick={() => {
                  handleRequest("accept");
                }}
                variant="contained"
                disableElevation
                color="secondary"
              >
                <Typography variant="subtitle2">Accept</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                color="error"
                onClick={() => {
                  handleRequest("reject");
                }}
              >
                <Typography variant="subtitle2">Reject</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GroupRequest;
