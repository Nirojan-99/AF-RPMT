import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    TextField,
    Typography,
  } from "@mui/material";
  import Header from "../../Components/Header";
  import Alert from "../../Components/Alert";
  
  //react
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  function User(props) {
    //user data
    const { token, userID, URL } = useSelector((state) => state.loging);
    const { id } = useParams();
  
    //alert popup
    const [error, setError] = useState("");
  
    //data does not exist
    const [hasData, setData] = useState(true);
  
    //state
    const [isLoaded, setLoaded] = useState(false);
  
    //input data
    const [name, setname] = useState("");
    const [dname, setdname] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [demail, setdEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [ID, setID] = useState("");
    const [dp, setDp] = useState("");
  
    //useEffect call
    useEffect(() => {
      axios
        .get(`${URL}users/${id}`, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          setLoaded(true);
          if (res.data) {
            setname(res.data.name);
            setdname(res.data.name);
            setContact(res.data.mobile_number);
            setEmail(res.data.email);
            setdEmail(res.data.email);
            setRole(res.data.role);
            setID(res.data.ID);
            setDp(res.data.dp);
          } else {
            setData(false);
          }
        })
        .catch((er) => {
          setLoaded(true);
          setData(false);
        });
    }, []);
  
    //submit
    const submit = () => {
      if (!name.trim()) {
        return setError("valid name required");
      }
      if (!email.trim() || !email.includes("@") || !email.includes(".")) {
        return setError("valid email required");
      }
      if (
        !contact.toString().trim() ||
        contact.length > 10 ||
        contact.length < 9
      ) {
        return setError("valid contact number required");
      }
      if (!role.trim()) {
        return setError("Require role");
      }
      if (password.trim() && !password.length < 6) {
        return setError("password should be longer");
      }
  
      const data = { name, email, mobile_number: contact, password, role };
  
      axios
        .put(`${URL}users/${id}`, data, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          toast("user Updated", { type: "success" });
        })
        .catch((er) => {
          toast("Unable to update, try again", { type: "error" });
        });
    };
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header handler={props.handler} />
        <ToastContainer />
        <Alert
          open={!!error}
          msg={error}
          title={"Alert!"}
          handleClose={() => {
            setError("");
          }}
        />
  
        <Box
          sx={{ flexGrow: 1 }}
          minHeight="78vh"
          component={Paper}
          elevation={0}
          py={2}
          square
        >
          {isLoaded ? (
            hasData ? (
              <Container maxWidth="sm">
                <Box
                  component={Paper}
                  variant={"outlined"}
                  p={2}
                  mb={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={dp}
                    sizes="large"
                    sx={{
                      width: { xs: 70, sm: 100 },
                      height: { xs: 70, sm: 100 },
                    }}
                  >
                    {dname.charAt(0)}
                  </Avatar>
                  <Typography variant="h4" sx={{ color: "#1071bc", mt: 1 }}>
                    {dname}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#888" }}>
                    {demail}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#888" }}>
                    {ID}
                  </Typography>
                  <Divider width="100%" sx={{ my: 2 }} />
                  <Box width={"90%"}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        margin="normal"
                        color="success"
                        autoFocus
                        required
                        value={name}
                        onChange={(event) => {
                          setname(event.target.value);
                        }}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        color="success"
                        required
                        value={contact}
                        onChange={(event) => {
                          setContact(event.target.value);
                        }}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        color="success"
                        required
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="Role"
                        color="success"
                        value={role}
                        placeholder="Role"
                        onChange={(event) => {
                          setRole(event.target.value);
                        }}
                      >
                        <MenuItem value={"Student"}>Student</MenuItem>
                        <MenuItem value={"Staff"}>Staff</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        margin="normal"
                        color="success"
                        required
                        type="password"
                        label="password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <Button
                        onClick={submit}
                        sx={{
                          color: "#fff",
                          bgcolor: "#1071bc",
                          my: 2,
                          "&:hover": { bgcolor: "#E28743", color: "#333" },
                        }}
                      >
                        Save Changes
                      </Button>
                    </FormControl>
                  </Box>
                </Box>
              </Container>
            ) : (
              <Typography sx={{ textAlign: "center", mt: 3, color: "red" }}>
                User did not found!
              </Typography>
            )
          ) : (
            <>
              <Container maxWidth="sm">
                <Skeleton
                  animation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 2 }}
                  width={"100%"}
                  height={600}
                />
              </Container>
            </>
          )}
        </Box>
      </Box>
    );
  }
  
  export default User;
  