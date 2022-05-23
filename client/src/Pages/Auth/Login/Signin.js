import Header from "../../../Components/Header";
import Alert from "../../../Components/Alert";
import { login } from "../../../Store/auth";

//mui
import { Grid, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

//react
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

const useStyles = makeStyles({
  container1: {
    paddingTop: "3rem",
    width: "100%",
    margin: "0",
  },
  paperCard: {
    height: "100%",
  },
  paperContainer: {
    paddingBottom: "3rem",
  },
  container: {
    width: "100%",
  },
  heading: {
    fontFamily: "Open Sans",
    fontWeight: "bold",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  form_conatiner: {
    padding: "4rem",
  },
  input_margin: {
    padding: "0",
  },
  button_margin: {
    marginTop: "5",
    marginBottom: "10",
  },
});

function SignIn(props) {
  //hooks
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //url
  const { URL } = useSelector((state) => state.loging);

  //user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //error state
  const [error, setError] = useState();

  //login handler
  const submit = () => {
    //validation
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      return setError("require valid email");
    }
    if (!password.trim() || password.length < 6) {
      return setError("password should be longer");
    }
    const data = { email, password };

    axios
      .post(`${URL}users/auth`, data)
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
        toast("Unable to login, try again", { type: "error" });
      });
  };

  return (
    <>
      <Alert
        open={!!error}
        msg={error}
        title={"Alert!"}
        handleClose={() => {
          setError("");
        }}
      />
      <ToastContainer />
      <Header mode={props.mode} handler={props.handler} />
      <Paper className={classes.paperContainer} square elevation={0}>
        <Box className={classes.container1} minHeight="75vh">
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
                  sx={{ height: "100%" }}
                  container
                  alignContent="center"
                  justifyContent="center"
                  spacing={0}
                >
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Typography
                      mt={2}
                      mb={2}
                      className={classes.heading}
                      variant="h3"
                      align="center"
                    >
                      Welcome Back,
                    </Typography>
                    <Box mb={1}>
                      <TextField
                        mt={4}
                        color="primary"
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
                      />
                    </Box>
                    <TextField
                      mt={4}
                      fullWidth
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      className={classes.input_margin}
                      margin="normal"
                      id="Password"
                      label="Password"
                      variant="outlined"
                      size="medium"
                      type="password"
                    />
                    <Typography align="right">
                      <Box mt={1} mb={1}>
                        <Button
                          href="/password/reset"
                          style={{ textTransform: "lowercase" }}
                          variant="text"
                          color="info"
                        >
                          forget password?
                        </Button>
                      </Box>
                    </Typography>
                    <Box mt={2} mb={3}>
                      <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        color="success"
                        onClick={submit}
                        className={classes.button_margin}
                      >
                        Sign In
                      </Button>
                    </Box>
                    {/* </FormControl> */}
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
