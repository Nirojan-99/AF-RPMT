import {
  Container,
  Paper,
  TextField,
  Box,
  FormControl,
  Typography,
} from "@mui/material";
import Heading from "../../../Components/Heading";
import { makeStyles } from "@mui/styles";
import RMTbtn from "../../../Components/RMTbtn";

//react
import { useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
//pages
import Alert from "../../../Components/Alert";

const useStyle = makeStyles({
  lables: {
    textAlign: "left",
    fontFamily: "Arial",
    fontWeight: "700",
    fontSize: "13px",
    color: "#ddd",
    marginBottom: "5px",
  },
  inputs: {
    color: "#99ccff",
    background: "rgb(6, 74, 130)",
    borderRadius: "5px",
    fontFamily: "arial",
    fontWeight: "600",
    letterSpacing: ".5px",
  },
});

function Editpassword() {
  //hooks
  const classes = useStyle();

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewpassword, setReNewPassword] = useState("");

  //error state
  const [error, setError] = useState("");
  const [isdisable, setDisbale] = useState(false);

  //submit handler
  const submit = () => {
    //validation
    if (
      !password.trim() ||
      password.length < 6 ||
      !newPassword.trim() ||
      newPassword.length < 6 ||
      !reNewpassword.trim()
    ) {
      return setError("Password length shoud be longer");
    }
    if (newPassword !== reNewpassword) {
      return setError("new passwords did not match");
    }

    const data = { newPassword, password };
    setDisbale(true);

    axios
      .patch(`${URL}users/password/${userID}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data.updated) {
          setPassword("");
          setNewPassword("");
          setReNewPassword("");
          toast("Password updated", { type: "success" });
        }
        setDisbale(false);
      })
      .catch((er) => {
        setDisbale(false);
        toast("Unable to update passwors, check old password and try again", {
          type: "error",
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <Alert
        open={!!error}
        msg={error}
        title={"Alert!"}
        handleClose={() => {
          setError("");
        }}
      />
      <Paper elevation={4}>
        <Box
          p={2}
          sx={{ bgcolor: "#073050", borderRadius: "3px", textAlign: "center" }}
          minHeight={"73vh"}
        >
          <Heading heading="Edit Password" />
          <Container maxWidth="xs">
            <Box mt={5}>
              <FormControl fullWidth>
                <Typography className={classes.lables}>Old Password</Typography>
                <TextField
                  type={"password"}
                  color="info"
                  variant="outlined"
                  margin="none"
                  size="small"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className={classes.inputs}
                  inputProps={{ className: classes.inputs }}
                  sx={{ marginBottom: "20px" }}
                />
                <Typography className={classes.lables}>New Password</Typography>
                <TextField
                  type={"password"}
                  color="info"
                  variant="outlined"
                  margin="none"
                  size="small"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                  }}
                  className={classes.inputs}
                  inputProps={{ className: classes.inputs }}
                  sx={{ marginBottom: "20px" }}
                />
                <Typography className={classes.lables}>
                  Repeat Password
                </Typography>
                <TextField
                  type={"password"}
                  color="info"
                  variant="outlined"
                  margin="none"
                  size="small"
                  value={reNewpassword}
                  onChange={(event) => {
                    setReNewPassword(event.target.value);
                  }}
                  className={classes.inputs}
                  inputProps={{ className: classes.inputs }}
                  sx={{ marginBottom: "20px" }}
                />
                <RMTbtn
                  btn="SAVE Password"
                  handler={isdisable ? null : submit}
                  wd="100%"
                />
              </FormControl>
            </Box>
          </Container>
        </Box>
      </Paper>
    </>
  );
}

export default Editpassword;
