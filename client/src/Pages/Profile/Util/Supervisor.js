import { Box, Button, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//react
import { useSelector } from "react-redux";
import { useState } from "react";

const useStyle = makeStyles({
  btn: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

function Supervisor(props) {
  //grp id
  const grp_id = props.grp;
  const page = props.page;

  //state
  const [btn, setBtn] = useState("Request");

  //hook
  const navigate = useNavigate();

  const classes = useStyle();

  //user data
  const { token, URL } = useSelector((state) => state.loging);

  const request = () => {
    setBtn("Requesting");
    axios
      .put(
        `${URL}groups/${grp_id}/${page}/${props.data._id}`,
        {},
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.requested) {
          navigate("/profile/group", { replace: true });
        }
      })
      .catch((er) => {
        toast("Unable to send request try again", { type: "error" });
      });
  };

  return (
    <Box my={2} bgcolor="#064A82" borderRadius={2}>
      <ToastContainer />
      <Grid container justifyContent={"space-between"} alignItems="center">
        <Grid item>
          <Typography variant="h4" sx={{ color: "#fff", paddingLeft: 2 }}>
            {props.data.name}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            disabled={btn === "Requesting"}
            sx={{
              bgcolor: "#0c558d",
              color: "#eee",
              margin: "0",
              textTransform: "none",
            }}
            color="secondary"
            onClick={request}
            className={classes.btn}
          >
            {btn}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Supervisor;
