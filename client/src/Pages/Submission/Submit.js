import { Container, Box, Paper, Typography, Button } from "@mui/material";
import * as React from "react";
import Header from "../../Components/Header";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress from "@mui/material/LinearProgress";

//react
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Alert from "../../Components/Alert";

//utils
import compare from "../../Utils/TimeCompare";
import { dateParser, timeParser } from "../../Utils/TimeFormatter";

const useStyle = makeStyles({
  dpLabel: {
    width: "100%",
    bgcolor: "red",
  },
  btn: {
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

function Submit(props) {
  //state
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [workprogress, setworkProgress] = useState(false);
  const [visibleremove, setvisibleremove] = useState(false);
  const [submission, setSubmission] = useState();
  const [doc, setDoc] = useState();
  const [submittable, setSubmittable] = useState(true);

  //sub id
  const { id } = useParams();

  //error state
  const [error, setError] = useState();

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //useEffect
  useEffect(() => {
    //get submission related data
    axios
      .get(`${URL}submissions/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setSubmission(res.data.data);
        const val = compare(res.data.data.due_date, res.data.data.due_time);
        setSubmittable(val);
      })
      .catch((er) => {});

    //get doc data
    axios
      .get(`${URL}documents/${id}/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setDoc(res.data);
        }
      })
      .catch((er) => {});
  }, []);

  const onFileChanged = (event) => {
    setSelectedFile(event.target.files[0]);

    setvisibleremove(true);
  };
  const onCanceled = () => {
    setworkProgress(false);
    setvisibleremove(false);
    setProgress(0);
    setSelectedFile();
  };

  //submit
  const submit = () => {
    if (!selectedFile) {
      return setError("Require file");
    }
    if (selectedFile.size / (1024 * 1024) > submission.max_size) {
      return setError("Maximum upload size is 10Mb");
    }
    setworkProgress(true);

    const data = new FormData();
    console.log("here");
    data.append("submmited_date", new Date());
    data.append("submission_id", id);
    data.append("doc", selectedFile);

    axios
      .post(`${URL}documents/${userID}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        console.log(res.data);
        setworkProgress(false);
        toast("submitted", { type: "success" });
      })
      .catch((er) => {
        toast("Unable to submit ,try again", { type: "error" });
        setworkProgress(false);
      });
  };

  //update
  const edit = () => {
    if (!selectedFile) {
      return setError("Require file");
    }
    if (selectedFile.size / (1024 * 1024) > submission.max_size) {
      return setError("Maximum upload size is 10Mb");
    }
    setworkProgress(true);

    const data = new FormData();

    data.append("submmited_date", new Date());
    data.append("doc", selectedFile);
    data.append("submitted_by", userID);

    axios
      .put(`${URL}documents/${doc._id}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        console.log(res.data);
        setworkProgress(false);
        toast("submitted", { type: "success" });
      })
      .catch((er) => {
        toast("Unable to submit ,try again", { type: "error" });
        setworkProgress(false);
      });
  };

  const classes = useStyle();
  return (
    <>
      <ToastContainer />
      <Alert
        open={!!error}
        msg={error}
        title="Alert!"
        handleClose={() => {
          setError("");
        }}
      />
      <Header mode={props.mode} handler={props.handler} />
      <Box
        component={Paper}
        sx={{ minHeight: "80vh" }}
        square
        elevation={1}
        py={3}
      >
        <Container maxWidth="sm">
          <Box
            component={Paper}
            elevation={3}
            square
            p={2}
            sx={{
              borderRadius: "4px",
              bgcolor: grey[600],
              color: "#333",
            }}
          >
            <Box
              component={Paper}
              elevation={3}
              square
              p={2}
              sx={{
                borderRadius: "4px",
                bgcolor: grey[500],
                color: "#333",
              }}
            >
              <Box my={2} textAlign={"center"}>
                <label
                  className={classes.dpLabel}
                  htmlFor="image-dp"
                  textAlign={"center"}
                >
                  <CloudUploadIcon
                    sx={{
                      width: 200,
                      height: 200,
                      alignContent: "center",
                    }}
                  />
                  <Typography
                    textAlign={"center"}
                    variant="body1"
                    sx={{ color: "#0D7FDC", mb: 0 }}
                  >
                    Drag and drop here
                  </Typography>
                </label>
                <input
                  disabled={!submittable}
                  hidden
                  id="image-dp"
                  type={"file"}
                  onChange={onFileChanged}
                  // value={selectedFile}
                  name={selectedFile}
                />
                <br />
                {workprogress && (
                  <Box sx={{ width: "100%", mb: -3 }}>
                    <LinearProgress
                      variant="indeterminate"
                      value={progress}
                      color="inherit"
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              my={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {
                <Typography>
                  {doc
                    ? "Submitted"
                    : submittable
                    ? "Time Reamaining "
                    : "Overdued"}
                </Typography>
              }
              <Box sx={{ flexGrow: 1 }} />
              <Button
                alignItems="center"
                disableElevation
                disabled={!submittable}
                sx={{ color: "#fff", fontFamily: "open sans" }}
                variant="contained"
                className={classes.btn}
                onClick={doc ? edit : submit}
              >
                {doc ? "Update" : "Save"}
              </Button>
            </Box>
            {doc && (
              <Box
                my={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography>Submitted by : {doc.submitted_by.name}</Typography>
                <Typography>
                  Submitted Date : {dateParser(doc.submmited_date)}
                </Typography>
                <Typography>
                  Submitted Time : {timeParser(doc.submmited_date)}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Submit;
