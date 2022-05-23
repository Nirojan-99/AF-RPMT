import Header from "../../../Components/Header";
import Alert from "../../../Components/Alert";
import { login } from "../../../Store/auth";

//mui
import {
  Grid,
  Paper,
  Divider,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

//react
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  container1: {
    paddingTop: "3rem",
    width: "100%",
    margin: "0",
  },
  card: {},
  paperCard: {
    height: "100%",
  },
  paperContainer: {
    paddingBottom: "3rem",
  },
});

function SignIn(props) {
  //hooks
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //url
  const { URL } = useSelector((state) => state.loging);

  //input data
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [conatct, setContact] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [NIC, setNIC] = useState("");

  //error state
  const [error, setError] = useState("");

  //submit handler
  const submit = () => {
    //validation
    if (!userName.trim()) {
      return setError("valid name required");
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      return setError("valid email required");
    }
    if (!conatct.trim() || conatct.length > 10 || conatct.length < 9) {
      return setError("valid contact number required");
    }
    if (!role.trim()) {
      return setError("Require role");
    }
    if (!gender.trim()) {
      return setError("require gender");
    }
    if (!password.trim() || password.length < 6) {
      return setError("password should be longer");
    }
    if (!NIC.trim() || NIC.length < 10) {
      return setError("require valid NIC");
    }

    const data = {
      name: userName,
      email,
      mobile_number: conatct,
      password,
      role,
      NIC,
      gender,
    };

    //send request
    axios
      .post(`${URL}users`, data)
      .then((res) => {
        dispatch(
          login({
            role: res.data.role,
            id: res.data._id,
            token: res.data.token,
          })
        );
        navigate("/", { replace: true });
      })
      .catch((er) => {
        toast("Unable to register, try again", { type: "error" });
      });
  };

  return (
    <>
      <Alert
        title="Alert!"
        msg={error}
        open={error}
        handleClose={() => {
          setError("");
        }}
      />
      <ToastContainer />
      <Header mode={props.mode} handler={props.handler} />
      <Paper className={classes.paperContainer} square elevation={0}>
        <Box className={classes.container1}>
          <Grid
            justifyContent="center"
            alignItems="stretch"
            direction="row"
            container
            spacing={0}
          >
            <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
            <Grid item className={classes.card} xs={10} sm={6} md={7} lg={5}>
              <Paper className={classes.paperCard} square elevation={4}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="center"
                  spacing={0}
                >
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Typography
                      mt={1}
                      mb={2}
                      className={classes.heading}
                      variant="h3"
                      align="center"
                    >
                      SIGN UP
                    </Typography>
                    <Box mb={1}>
                      <TextField
                        mt={4}
                        fullWidth
                        value={userName}
                        onChange={(event) => {
                          setUserName(event.target.value);
                        }}
                        className={classes.input_margin}
                        margin="normal"
                        id="name"
                        label="User Name"
                        variant="outlined"
                        size="medium"
                        color="success"
                      />
                    </Box>
                    <Box mb={1}>
                      <TextField
                        mt={4}
                        fullWidth
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        className={classes.input_margin}
                        margin="normal"
                        id="email"
                        label="Email"
                        variant="outlined"
                        size="medium"
                        color="success"
                      />
                    </Box>
                    <Box mb={1}>
                      <TextField
                        mt={4}
                        fullWidth
                        value={conatct}
                        onChange={(event) => {
                          setContact(event.target.value);
                        }}
                        className={classes.input_margin}
                        margin="normal"
                        id="number"
                        label="Contact Number"
                        variant="outlined"
                        size="medium"
                        color="success"
                      />
                    </Box>
                    <Box mb={1}>
                      <TextField
                        mt={4}
                        fullWidth
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        className={classes.input_margin}
                        margin="normal"
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="medium"
                        color="success"
                      />
                    </Box>
                    <Box mb={1}>
                      <Select
                        fullWidth
                        value={role}
                        onChange={(event) => {
                          setRole(event.target.value);
                        }}
                        id="Role"
                        placeholder="Role"
                      >
                        <MenuItem value={"Student"}>Student</MenuItem>
                        <MenuItem value={"Staff"}>Staff</MenuItem>
                      </Select>
                    </Box>
                    <Box mb={1}>
                      <TextField
                        mt={4}
                        fullWidth
                        value={NIC}
                        onChange={(event) => {
                          setNIC(event.target.value);
                        }}
                        className={classes.input_margin}
                        margin="normal"
                        id="NIC"
                        label="NIC"
                        variant="outlined"
                        size="medium"
                        color="success"
                      />
                    </Box>
                    <Box>
                      <Select
                        fullWidth
                        value={gender}
                        onChange={(event) => {
                          setGender(event.target.value);
                        }}
                        labelId="demo-simple-select-label"
                        id="gender"
                        placeholder="Gender"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <Divider />
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                    </Box>
                    <Box mt={3} mb={3}>
                      <Button
                        fullWidth
                        onClick={submit}
                        size="medium"
                        variant="contained"
                        color="success"
                        className={classes.button_margin}
                      >
                        Sign up
                      </Button>
                      <Box sx={{ display: "flex" }} my={2}>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                          color="info"
                          sx={{ textTransform: "none", fontWeight: "600" }}
                          href="/auth/login"
                        >
                          Alredy have account?
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default SignIn;
