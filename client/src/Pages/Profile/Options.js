import { Avatar, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

//react
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const useStyle = makeStyles({
  btn: {
    color: "#fff",
    textDecoration: "none",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: "15px",
  },
});

function Options(props) {
  //useeffect
  useEffect(() => {
    axios
      .get(`${URL}users/dp/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setDp(res.data.dp);
      })
      .catch((er) => {});
  }, []);

  //hooks
  const { page } = useParams();
  const classes = useStyle();

  //user data
  const { token, role, userID, URL } = useSelector((state) => state.loging);

  //state
  const [user, setUser] = useState(role);
  const [dp, setDp] = useState("");

  return (
    <>
      <Paper elevation={4}>
        <Box
          p={2}
          sx={{ bgcolor: "#073050", borderRadius: "3px", textAlign: "center" }}
          pb={10}
          height="64vh"
        >
          <Grid mb={6} mt={2} container justifyContent="center">
            <Avatar
              variant="rounded"
              alt="User DP"
              src={dp}
              sx={{ width: 56, height: 56 }}
            >
              U
            </Avatar>
          </Grid>
          <Btn link="/profile/details" title="Profile" />
          {user !== "Admin" && (
            <Btn
              link={
                user === "Staff" ||
                user === "Supervisor" ||
                user === "CoSupervisor"
                  ? "/research/sup"
                  : "/profile/research"
              }
              title="Research"
            />
          )}
          {user !== "Admin" && (
            <Btn
              link={
                user !== "Student" ? "/Submissions" : "/profile/submissions"
              }
              title="Submission"
            />
          )}
          {user === "Admin" && <Btn link="/Users" title="Users" />}
          {user === "Admin" && <Btn link="/Groups" title="Groups" />}
          {user === "Staff" && <Btn link="/pannel" title="Pannel" />}
        </Box>
      </Paper>
    </>
  );
}

const Btn = (props) => {
  const classes = useStyle();
  const { page } = useParams();
  const bcolor = page === props.link ? "#094F88" : "#073A63";
  return (
    <>
      <Link className={classes.btn} to={`${props.link}`}>
        <Box
          elevation={4}
          my={2}
          p={1}
          py={1.5}
          sx={{ bgcolor: bcolor, color: "#fff", borderRadius: "6px" }}
        >
          {props.title}
        </Box>
      </Link>
    </>
  );
};

export default Options;
