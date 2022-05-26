import {
    Avatar,
    Box,
    Container,
    Button,
    FormControl,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import Header from "../../Components/Header";
  import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
  import { TimePicker } from "@mui/x-date-pickers/TimePicker";
  import PublishIcon from "@mui/icons-material/Publish";
  
  import Alert from "../../Components/Alert";
  
  //react
  import axios from "axios";
  import { useState } from "react";
  import { useSelector } from "react-redux";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useNavigate } from "react-router-dom";
  
  function NewSubmission(props) {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
  
    //user data
    const { token, userID, URL } = useSelector((state) => state.loging);
  
    //form data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [scheme, setScheme] = useState("");
  
    //handle files
    const fileHandler = (event) => {
      setFile(event.target.files[0]);
    };
    const schemeHandler = (event) => {
      setScheme(event.target.files[0]);
    };
  
    //hooks
    const navigate = useNavigate();
  
    //error
    const [error, setError] = useState("");
  
    //submit
    const submit = () => {
      if (!title.trim()) {
        return setError("Require valid title");
      }
      if (!description.trim() || description.length < 100) {
        return setError("Require longer description");
      }
      if (
        file === undefined ||
        file === null ||
        scheme === undefined ||
        scheme === null
      ) {
        return setError("document and scheme are required");
      }
      if (file.size / (1024 * 1024) > 10 || scheme.size / (1024 * 1024) > 10) {
        return setError("Maximum file size id 10Mb");
      }
  
      //data
      const data = new FormData();
      data.append("title", title);
      data.append("due_date", date);
      data.append("due_time", time.toISOString());
      data.append("visibility", true);
      data.append("description", description);
      data.append("max_size", "10");
      data.append("doc", file);
      data.append("scheme", scheme);
  
      axios
        .post(`${URL}submissions/${userID}`, data, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            toast("Submission created", { type: "success" });
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 3000);
          }
        })
        .catch((er) => {
          toast("Unable to add submission, try again", { type: "error" });
        });
    };
  
    return (
      <>
        <ToastContainer />
        <Alert
          msg={error}
          open={!!error}
          handleClose={() => {
            setError("");
          }}
          title="Alert!"
        />
        <Header handler={props.handler} />
        <Box py={2} minHeight={"78vh"} component={Paper} evelavtion={0} square>
          <Container maxWidth="sm">
            <Box
              component={Paper}
              variant="outlined"
              p={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: { md: 18, xs: 13 }, color: "#1071bc" }}>
                New Submission
              </Typography>
              <Box width={"95%"}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    required
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    color="success"
                    autoFocus
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disablePast
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          label="Due date"
                          color="success"
                          margin="normal"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Due Time"
                      value={time}
                      onChange={(newValue) => {
                        setTime(newValue);
                        console.log(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField color="success" margin="normal" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    multiline
                    maxRows={5}
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    required
                    color="success"
                  />
                  <input onChange={fileHandler} type="file" hidden id="doc" />
                  <label htmlFor="doc" style={{ marginTop: 2 }}>
                    <Typography sx={{ color: "#1071bc" }}>Document</Typography>
                    <Avatar
                      sx={{ cursor: "pointer", width: "100%", height: 50, mt: 2 }}
                      variant="square"
                    >
                      <PublishIcon size="large" sx={{ color: "#333" }} />
                    </Avatar>
                  </label>
                  {file && (
                    <>
                      <Typography sx={{ fontWeight: "600", fontSize: 12 }}>
                        Selected Doc :{file.name}
                      </Typography>
                      <Typography sx={{ fontWeight: "600", fontSize: 12 }}>
                        size :{(file.size / (1024 * 1024)).toFixed(2)}Mb
                      </Typography>
                    </>
                  )}
  
                  <input
                    onChange={schemeHandler}
                    type="file"
                    hidden
                    id="Scheme"
                  />
                  <label htmlFor="Scheme" style={{ marginTop: 4 }}>
                    <Typography sx={{ color: "#1071bc", mt: 2 }}>
                      Marking Scheme
                    </Typography>
                    <Avatar
                      sx={{ cursor: "pointer", width: "100%", height: 50, mt: 2 }}
                      variant="square"
                    >
                      <PublishIcon size="large" sx={{ color: "#333" }} />
                    </Avatar>
                  </label>
                  {scheme && (
                    <>
                      <Typography sx={{ fontWeight: "600", fontSize: 12 }}>
                        Selected Scheme : {scheme.name} /
                      </Typography>
                      <Typography sx={{ fontWeight: "600", fontSize: 12 }}>
                        size :{(scheme.size / (1024 * 1024)).toFixed(2)}Mb
                      </Typography>
                    </>
                  )}
                  <Button
                    onClick={submit}
                    sx={{
                      my: 3,
                      color: "#333",
                      bgcolor: "#1071bc",
                      "&:hover": { color: "#fff" },
                    }}
                    variant="contained"
                  >
                    Add
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Container>
        </Box>
      </>
    );
  }
  
  export default NewSubmission;
  