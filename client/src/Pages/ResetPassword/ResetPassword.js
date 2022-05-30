import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";

//react
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Alert from "../../Components/Alert";

function ResetPassword(props) {
  //state
  const [stage, setStage] = useState("email");
  const [isLoaded, setLoaded] = useState(true);
  const [email, setEmail] = useState("");
  const [enteredOTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [user_id, setID] = useState("");

  //URL
  const { URL } = useSelector((state) => state.loging);

  //hook
  const navigate = useNavigate();

  //handlers
  const submitEmail = () => {
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      return setError("valid email required");
    }
    setLoaded(false);
    axios
      .get(`${URL}users/password/${email}`)
      .then((res) => {
        setStage("otp");
        setLoaded(true);
        setID(res.data._id);
      })
      .catch((er) => {
        toast("Invalid email", { type: "error" });
        setLoaded(true);
      });
  };

  const submitOTP = () => {
    if (!enteredOTP.trim() || enteredOTP.length !== 4 || isNaN(enteredOTP)) {
      return setError("OTP should contail 4 digit number");
    }
    setLoaded(false);
    axios
      .post(`${URL}users/password/${user_id}`, { OTP: enteredOTP })
      .then((res) => {
        setStage("password");
        setLoaded(true);
        toast("OTP matched, enter new password", { type: "success" });
      })
      .catch((er) => {
        setLoaded(true);
        toast("OTP did not match", { type: "error" });
      });
  };

  const submitPassword = () => {
    if (!password.trim() || password.length < 6) {
      return setError("password should be longer");
    }
    if (password !== repassword.trim()) {
      return setError("passwords did not match");
    }

    axios
      .put(`${URL}users/password/${user_id}`, { newPassword: password })
      .then((res) => {
        toast("password is reset, login with new password", {
          type: "success",
        });
        setTimeout(() => {
          navigate("/auth/sign-in", { replace: true });
        }, 3000);
      })
      .catch((er) => {
        toast("unable to reset password, try again", { type: "error" });
      });
  };

  return (
    <>
      <Alert
        open={!!error}
        msg={error}
        title="Alert!"
        handleClose={() => {
          setError("");
        }}
      />
      <ToastContainer />
      <Header handler={props.handler} />
      <Box
        sx={{}}
        component={Paper}
        square
        elevation={0}
        minHeight="79vh"
        p={2}
      >
        <Container maxWidth="sm">
          {stage === "email" && (
            <Box component={Paper} variant="outlined" p={2}>
              <Typography sx={{ color: "#1071bc", fontSize: 20 }}>
                Email
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: "400" }}>
                Enter Youe email
              </Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
                required
                autoFocus
                sx={{ mt: 2, mb: 4 }}
                size="medium"
                margin="normal"
                color="success"
                label="email address"
                id="email"
              />
              <Button
                onClick={submitEmail}
                sx={{
                  width: "100%",
                  bgcolor: "#1071bc",
                  color: "#fff",
                  "&:hover": { bgcolor: "#888" },
                }}
              >
                Submit
              </Button>
            </Box>
          )}
          {stage === "otp" && (
            <Box component={Paper} variant="outlined" p={2}>
              <Typography sx={{ color: "#1071bc", fontSize: 20 }}>
                OTP
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: "400" }}>
                Enter OTP
              </Typography>
              <TextField
                fullWidth
                value={enteredOTP}
                onChange={(ev) => {
                  setOTP(ev.target.value);
                }}
                required
                autoFocus
                sx={{ mt: 2, mb: 4 }}
                size="medium"
                margin="normal"
                color="success"
                label="OTP"
                type={"password"}
              />
              <Button
                onClick={submitOTP}
                sx={{
                  width: "100%",
                  bgcolor: "#1071bc",
                  color: "#fff",
                  "&:hover": { bgcolor: "#888" },
                }}
              >
                Submit
              </Button>
            </Box>
          )}
          {stage === "password" && (
            <Box component={Paper} variant="outlined" p={2}>
              <Typography sx={{ color: "#1071bc", fontSize: 20 }}>
                New Password
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: "400" }}>
                Enter new Passsword
              </Typography>
              <TextField
                fullWidth
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                autoFocus
                sx={{ mt: 2, mb: 2 }}
                size="medium"
                margin="normal"
                color="success"
                label="New-Password"
                type={"password"}
              />
              <TextField
                fullWidth
                value={repassword}
                onChange={(event) => {
                  setRepassword(event.target.value);
                }}
                required
                sx={{ mt: 2, mb: 4 }}
                size="medium"
                margin="normal"
                color="success"
                label="Re-Type Password"
                type={"password"}
              />
              <Button
                onClick={submitPassword}
                sx={{
                  width: "100%",
                  bgcolor: "#1071bc",
                  color: "#fff",
                  "&:hover": { bgcolor: "#888" },
                }}
              >
                Submit
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default ResetPassword;
