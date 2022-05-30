import {
  Avatar,
  Box,
  Container,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  Skeleton,
  ToggleButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Header from "../../Components/Header";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import PublishIcon from "@mui/icons-material/Publish";

import Alert from "../../Components/Alert";
import Confirmation from "../../Components/Confirmation";

//react
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function NewSubmission(props) {
  //state
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [onDelete, setDelete] = useState(false);
  const [selected, setSelected] = useState(false);

  //submission id
  const { id } = useParams();
  const [isLoaded, setLoaded] = useState(id ? false : true);
  const [isEmpty, setEmpty] = useState("");

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [scheme, setScheme] = useState("");

  //old doc details
  const [currDoc, setCurrDoc] = useState("");
  const [currSchema, setCurrSchema] = useState("");

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
      return setError("Maximum file size is 10Mb");
    }

    //data
    const data = new FormData();
    data.append("title", title);
    data.append("due_date", date);
    data.append("due_time", time.toString());
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

  //use effect call
  useEffect(() => {
    if (id) {
      axios
        .get(`${URL}submissions/${id}`, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          const { data } = res.data;
          setTitle(data.title);
          setTime(data.due_time);
          setDate(data.due_date);
          setDescription(data.description);
          setCurrDoc(data.document);
          setCurrSchema(data.marking_scheme);
          setLoaded(true);
          setSelected(data.visibility);
        })
        .catch((er) => {
          setLoaded(true);
          setEmpty(true);
        });
    }
  }, []);

  //edit handler
  const edit = () => {
    //validation
    if (!title.trim()) {
      return setError("Require valid title");
    }
    if (!description.trim() || description.length < 100) {
      return setError("Require longer description");
    }
    if (file) {
      if (file.size / (1024 * 1024) > 10) {
        return setError("Maximum file size is 10Mb");
      }
    }
    if (scheme) {
      if (scheme.size / (1024 * 1024) > 10) {
        return setError("Maximum file size is 10Mb");
      }
    }

    //data
    const data = new FormData();
    data.append("title", title);
    data.append("due_date", date);
    data.append("due_time", time.toString());
    data.append("description", description);
    data.append("max_size", "10");
    data.append("visibility", selected ? true : false);
    data.append("doc", file);
    data.append("scheme", scheme);

    axios
      .put(`${URL}submissions/${id}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          toast("Submission Updated", { type: "success" });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 3000);
        }
      })
      .catch((er) => {
        toast("Unable to update submission, try again", { type: "error" });
      });
  };

  //delete submission
  const deleteHandler = () => {
    axios
      .delete(`${URL}submissions/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        toast("Submission deleted", { type: "success" });
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
      })
      .catch((er) => {
        setDelete(false);
        toast("Unable to delete, try again", { type: "error" });
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
      <Confirmation
        open={onDelete}
        handleClose={() => {
          setDelete(false);
        }}
        handleYes={deleteHandler}
      />
      <Header handler={props.handler} />
      <Box py={2} minHeight={"78vh"} component={Paper} evelavtion={0} square>
        {id && isEmpty ? (
          <Typography sx={{ textAlign: "center" }}>
            No Data Available
          </Typography>
        ) : (
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
              <Typography
                sx={{ fontSize: { md: 18, xs: 13 }, color: "#1071bc" }}
              >
                {id ? "Edit Submission" : "New Submission"}
              </Typography>
              <Box width={"95%"}>
                <FormControl fullWidth>
                  {isLoaded ? (
                    <TextField
                      size="small"
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
                  ) : (
                    <Skeleton
                      animation="pulse"
                      variant="rectangular"
                      sx={{ borderRadius: 1, my: 1.5 }}
                      width={"100%"}
                      height={35}
                    />
                  )}
                  {isLoaded ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disablePast
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            label="Due date"
                            color="success"
                            margin="normal"
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    <Skeleton
                      animation="pulse"
                      variant="rectangular"
                      sx={{ borderRadius: 1, my: 1.5 }}
                      width={"100%"}
                      height={35}
                    />
                  )}
                  {isLoaded ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Due Time"
                        value={time}
                        onChange={(newValue) => {
                          setTime(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            color="success"
                            margin="normal"
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    <Skeleton
                      animation="pulse"
                      variant="rectangular"
                      sx={{ borderRadius: 1, my: 1.5 }}
                      width={"100%"}
                      height={35}
                    />
                  )}
                  {isLoaded ? (
                    <TextField
                      multiline
                      size="small"
                      maxRows={7}
                      minRows={5}
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
                  ) : (
                    <Skeleton
                      animation="pulse"
                      variant="rectangular"
                      sx={{ borderRadius: 1, my: 1.5 }}
                      width={"100%"}
                      height={120}
                    />
                  )}
                  {id &&
                    (isLoaded ? (
                      <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => {
                          setSelected(!selected);
                        }}
                        sx={{ my: 1, textTransform: "none" }}
                      >
                        {`${selected ? "Visible" : "Invisible"} To Students`}
                      </ToggleButton>
                    ) : (
                      <Skeleton
                        animation="pulse"
                        variant="rectangular"
                        sx={{ borderRadius: 1, my: 1.5 }}
                        width={"100%"}
                        height={50}
                      />
                    ))}
                  <input onChange={fileHandler} type="file" hidden id="doc" />
                  <label htmlFor="doc" style={{ marginTop: 2 }}>
                    <Typography sx={{ color: "#1071bc" }}>Document</Typography>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        width: "100%",
                        height: 50,
                        mt: 2,
                      }}
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
                  {id &&
                    (isLoaded ? (
                      <Button
                        href={currDoc}
                        variant="outlined"
                        sx={{
                          width: 180,
                          mt: 1,
                          textTransform: "none",
                          fontSize: 12,
                        }}
                        color="success"
                      >
                        View Current Doc
                      </Button>
                    ) : (
                      <Skeleton
                        animation="pulse"
                        variant="rectangular"
                        sx={{ borderRadius: 1, my: 1.5 }}
                        width={"30%"}
                        height={30}
                      />
                    ))}
                  <input
                    onChange={schemeHandler}
                    type="file"
                    hidden
                    id="Scheme"
                  />
                  <label htmlFor="Scheme" style={{ marginTop: 4 }}>
                    <Typography sx={{ color: "#1071bc", mt: 2 }}>
                      Marking Schema
                    </Typography>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        width: "100%",
                        height: 50,
                        mt: 2,
                      }}
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
                  {id &&
                    (isLoaded ? (
                      <Button
                        href={currSchema}
                        variant="outlined"
                        sx={{
                          width: 180,
                          mt: 1,
                          textTransform: "none",
                          fontSize: 12,
                        }}
                        color="success"
                      >
                        View Current Schema
                      </Button>
                    ) : (
                      <Skeleton
                        animation="pulse"
                        variant="rectangular"
                        sx={{ borderRadius: 1, my: 1.5 }}
                        width={"30%"}
                        height={30}
                      />
                    ))}
                  <Button
                    onClick={id ? edit : submit}
                    sx={{
                      my: 3,
                      color: "#333",
                      bgcolor: "#1071bc",
                      "&:hover": { color: "#fff" },
                    }}
                    variant="contained"
                  >
                    {id ? "Edit" : "Add"}
                  </Button>
                </FormControl>
                {id && (
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 1 }} />
                    <Button
                      onClick={() => {
                        setDelete(true);
                      }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}

export default NewSubmission;
