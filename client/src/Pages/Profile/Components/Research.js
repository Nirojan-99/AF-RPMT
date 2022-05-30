import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Heading from "../../../Components/Heading";
import { makeStyles } from "@mui/styles";
import RMTbtn from "../../../Components/RMTbtn";
import RPMAccordion from "../Util/RPMAccordion";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

//react
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublishIcon from "@mui/icons-material/Publish";

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

function Research() {
  //hook
  const classes = useStyle();

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //state
  const [status, setStatus] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [grp_id, setGrpId] = useState(null);
  const [newTopic, setTopic] = useState("");

  //useEffect
  useEffect(() => {
    axios
      .get(`${URL}users/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data.group_id) {
          setGrpId(res.data.group_id);
          axios
            .get(`${URL}groups/topics/${res.data.group_id}`, {
              headers: { Authorization: "Agriuservalidation " + token },
            })
            .then((res) => {
              setStatus(res.data.status);
              setLoaded(true);
            })
            .catch((er) => {
              setLoaded(true);
            });
        } else {
          setLoaded(true);
          setStatus(null);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });

    //get requests
  }, []);

  //update topic
  const updateTopic = () => {
    if (!newTopic.trim()) {
      return toast("require valid topic", { type: "error" });
    }

    axios
      .patch(
        `${URL}groups/topics/${grp_id}`,
        { topic: newTopic },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        setTopic("");
        toast("topic updated", { type: "success" });
      })
      .catch((er) => {
        setTopic("");
        toast("unable to update topic , try again", { type: "error" });
      });
  };

  return (
    <>
      <ToastContainer />
      <Paper elevation={4}>
        <Box
          p={2}
          sx={{
            bgcolor: "#073050",
            borderRadius: "3px",
            textAlign: "center",
          }}
          minHeight={"77vh"}
        >
          {isLoaded ? (
            <>
              <Heading heading="Research" />
              {status === "reject" && (
                <Box
                  my={3}
                  p={2}
                  sx={{ border: 1, borderColor: "#116BB1", borderRadius: 2 }}
                >
                  <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    justifyContent={"start"}
                    alignItems={{ xs: "left", md: "center" }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ textAlign: "left", mb: { xs: 1, md: 0 } }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "open sans",
                          color: "#116BB1",
                          textAlign: "left",
                        }}
                      >
                        New Research Topic :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "stretch",
                        }}
                      >
                        <TextField
                          value={newTopic}
                          onChange={(event) => {
                            setTopic(event.target.value);
                          }}
                          margin="none"
                          fullWidth
                          variant="outlined"
                          color="info"
                          size="small"
                          className={classes.inputs}
                          inputProps={{ className: classes.inputs }}
                        />
                        <Button
                          disableElevation
                          color="info"
                          variant="contained"
                          onClick={updateTopic}
                          sx={{
                            ml: 2,
                            color: "#fff",
                            bgcolor: "#116BB1",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#fff", color: "#333" },
                          }}
                        >
                          Update
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Divider />
              {status !== null && grp_id !== null && <RPMAccordion />}
              {(status === null || grp_id === null) && (
                <Box my={2} px={2} sx={{ bgcolor: "#0C4D82" }} borderRadius={1}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Grid>
                      <Typography variant="h4" sx={{ color: "#fff" }}>
                        Request for Group
                      </Typography>
                    </Grid>
                    <Grid>
                      <IconButton href="/profile/own-group">
                        <ArrowRightIcon color="info" fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Box my={2} px={2} sx={{ bgcolor: "#0C4D82" }} borderRadius={1}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <Grid>
                    <Typography variant="h4" sx={{ color: "#fff" }}>
                      Your group
                    </Typography>
                  </Grid>
                  <Grid>
                    <IconButton href="/profile/group">
                      <ArrowRightIcon color="info" fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <>
              <Skeleton
                animation="pulse"
                variant="rectangular"
                sx={{ borderRadius: 1, mb: 2 }}
                width={"100%"}
                height={50}
              />
              <Skeleton
                animation="pulse"
                variant="rectangular"
                sx={{ borderRadius: 1, mb: 2 }}
                width={"100%"}
                height={50}
              />
              <Skeleton
                animation="pulse"
                variant="rectangular"
                sx={{ borderRadius: 1, mb: 2 }}
                width={"100%"}
                height={50}
              />
            </>
          )}
          {isLoaded && grp_id && (
            <Box>
              <Typography sx={{ color: "#aaa", fontSize: 14, my: 2 }}>
                Topic Status :{" "}
                {status === "false"
                  ? "Pending"
                  : status === "accept"
                  ? "Accepted"
                  : "Rejected"}
              </Typography>
              <Button
                href={`/topic/doc/${grp_id}`}
                disabled={status === "accept"}
                sx={{ textTransform: "none" }}
                endIcon={<PublishIcon />}
                variant="outlined"
                color="info"
              >
                Submit Topic Doc
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default Research;
