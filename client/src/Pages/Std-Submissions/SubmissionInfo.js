import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  Skeleton,
  TextField,
} from "@mui/material";

import Header from "../../Components/Header";
import Alert from "../../Components/Alert";

//react
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubmissionInfo(props) {
  //sub id
  const { id } = useParams();

  //user data
  const { token, userID, role, URL } = useSelector((state) => state.loging);

  //state
  const [submission, setSubmission] = useState([]);
  const [group, setGroup] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //useEffect
  useEffect(() => {
    axios
      .get(`${URL}documents/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        // console.log(res.data.data);
        setSubmission(res.data.data);
        setGrade(res.data.data.grade);
        setComment(res.data.data.comments);
        axios
          .get(`${URL}groups/admin/${res.data.data.group_id}`, {
            headers: { Authorization: "Agriuservalidation " + token },
          })
          .then((res) => {
            console.log(res.data);
            setGroup(res.data);
            setLoaded(true);
          })
          .catch((er) => {
            setLoaded(true);
          });
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //form data
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");

  //error state
  const [error, setError] = useState();

  //save
  const save = () => {
    if (!grade.toString().trim()) {
      return setError("Require valid grade");
    }

    const data = { grade, comments: comment };

    axios
      .put(`${URL}documents/staff/${id}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        toast("Grade added", { type: "success" });
      })
      .catch((er) => {
        toast("Unable to add grade, try again", { type: "error" });
      });
  };

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
        {isLoaded ? (
          submission ? (
            <Container
              maxWidth="sm"
              component={Paper}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <Box width={"100%"}>
                <Typography
                  sx={{ color: "#1071bc", textAlign: "center", fontSize: 20 }}
                >
                  {submission.submission_id.title}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Group Name
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ color: "#E28743", fontSize: 15 }}>
                      {group.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Submissted By
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ color: "#E28743", fontSize: 15 }}>
                      {submission.submitted_by.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Members
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {group.members.length > 0 &&
                      group.members.map((row, index) => {
                        return (
                          <Typography
                            key={index}
                            sx={{ color: "#E28743", fontSize: 15 }}
                          >
                            {row.name}
                          </Typography>
                        );
                      })}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Submission
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      href={submission.url}
                      disableElevation
                      sx={{
                        textTransform: "none",
                        bgcolor: "#E28743",
                        "&:hover": { bgcolor: "#888", color: "#333" },
                      }}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Scheme
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      href={submission.submission_id.marking_scheme}
                      disableElevation
                      sx={{
                        textTransform: "none",
                        bgcolor: "#E28743",
                        "&:hover": { bgcolor: "#888", color: "#333" },
                      }}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Instaructions
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      href={submission.submission_id.document}
                      disableElevation
                      sx={{
                        textTransform: "none",
                        bgcolor: "#E28743",
                        "&:hover": { bgcolor: "#888", color: "#333" },
                      }}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Grade
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="Grade"
                      type="number"
                      size="small"
                      margin="none"
                      color="success"
                      fullWidth
                      value={grade}
                      onChange={(event) => {
                        setGrade(event.target.value);
                      }}
                      autoFocus
                    ></TextField>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ color: "#ccc", fontSize: 15 }}>
                      Comments
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      multiline
                      minRows={3}
                      label="Comments"
                      type="text"
                      size="small"
                      margin="none"
                      color="success"
                      fullWidth
                      value={comment}
                      onChange={(event) => {
                        setComment(event.target.value);
                      }}
                      maxRows={4}
                    ></TextField>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container alignItems="center">
                  <Grid item xs={4}></Grid>
                  <Grid item xs={8}>
                    <Button
                      onClick={save}
                      fullWidth
                      disableElevation
                      sx={{
                        textTransform: "none",
                        bgcolor: "#E28743",
                        "&:hover": { bgcolor: "#888", color: "#333" },
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          ) : (
            <Typography sx={{ color: "#999", textAlign: "center", mt: 3 }}>
              No data available
            </Typography>
          )
        ) : (
          <Container maxWidth="sm">
            <Skeleton
              animation="pulse"
              variant="rectangular"
              sx={{ borderRadius: 1, mb: 2 }}
              width={"100%"}
              height={500}
            />
          </Container>
        )}
      </Box>
    </>
  );
}

export default SubmissionInfo;
