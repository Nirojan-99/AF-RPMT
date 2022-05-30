import {
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  Divider,
  Container,
  List,
  Collapse,
  Button,
  Skeleton,
} from "@mui/material";
import Heading from "../../../Components/Heading";
import { makeStyles } from "@mui/styles";
import RMTbtn from "../../../Components/RMTbtn";
import Members from "../Util/Members";
import { TransitionGroup } from "react-transition-group";

//react
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "../../../Components/Alert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const useStyle = makeStyles({
  inputs: {
    color: "#99ccff",
    background: "rgb(6, 74, 130)",
    borderRadius: "5px",
    fontFamily: "arial",
    fontWeight: "600",
    letterSpacing: ".5px",
  },
});

function OwnGroup() {
  //hooks
  const classes = useStyle();

  //state
  const [hasGroup, setHasGroup] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  //group data
  const [grpName, setGrpName] = useState("");
  const [grp_id, setgrp_id] = useState("");
  const [field, setgField] = useState("");
  const [topic, setgTopic] = useState("");
  const [leader, setLeader] = useState("");
  const [leaderID, setLeaderID] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [coSupervisor, setCoSupervisor] = useState("");
  const [requestedSupervisor, setRSupervisor] = useState(false);
  const [requestedCoSupervisor, setRCoSupervisor] = useState(false);
  const [members, setMembers] = useState([]);
  const [pannel, setPannel] = useState([]);

  //user data
  const { token, userID, URL } = useSelector((state) => state.loging);

  //useEffect call
  useEffect(() => {
    axios
      .get(`${URL}groups/users/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data) {
          setgrp_id(res.data.data._id);
          setLoaded(true);
          setHasGroup(true);
          setGrpName(res.data.data.name);
          setgField(res.data.data.research_Field);
          setgTopic(res.data.data.research_Topic.name);
          setLeader(res.data.data.leader.name);
          setLeaderID(res.data.data.leader._id);
          setMembers(res.data.data.members);
          setPannel(res.data.data.pannel);
          setSupervisor(
            res.data.data.supervisor && res.data.data.supervisor.name
          );
          setCoSupervisor(
            res.data.data.coSupervisor && res.data.data.coSupervisor.name
          );
          setRSupervisor(
            res.data.data.requested.supervisor !== null ? true : false
          );
          setRCoSupervisor(
            res.data.data.requested.coSupervisor !== null ? true : false
          );
        } else {
          setHasGroup(false);
          setLoaded(true);
        }
      })
      .catch((er) => {
        console.log(er);
        setLoaded(true);
        setHasGroup(false);
      });
  }, []);

  //create group
  const addgroup = () => {
    //validation
    if (!research_Field.trim() || !research_Topic.trim() || !name.trim()) {
      return setError("All fields are required");
    }

    const data = { research_Field, research_Topic, name };
    axios
      .post(`${URL}groups/${userID}`, data, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data.added) {
          window.location.reload();
        }
      })
      .catch((er) => {
        toast("Unabele to create a group,try again", { type: "error" });
      });
  };

  //new group data
  const [name, setname] = useState("");
  const [research_Field, setField] = useState("");
  const [research_Topic, setTopic] = useState("");

  //error state
  const [error, setError] = useState("");

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
          sx={{
            bgcolor: "#073050",
            borderRadius: "3px",
            textAlign: "center",
          }}
          minHeight={"73vh"}
        >
          {isLoaded && hasGroup && (
            <>
              <Heading heading="Research Details" />
              <Box my={2} />
              {/*  */}
              <Grid
                container
                justifyContent={"start"}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Grid item xs={4}>
                  <Typography
                    variant="h4"
                    textAlign={"left"}
                    sx={{ color: "#aaa" }}
                  >
                    Group Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: "left",
                      color: "#117DD5",
                      textTransform: "capitalize",
                    }}
                  >
                    {grpName}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              {/*  */}
              <Grid
                container
                justifyContent={"start"}
                alignItems="center"
                sx={{ my: 1 }}
              >
                <Grid item xs={4}>
                  <Typography
                    variant="h4"
                    textAlign={"left"}
                    sx={{ color: "#aaa" }}
                  >
                    Research Field
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: "left",
                      color: "#117DD5",
                      textTransform: "capitalize",
                    }}
                  >
                    {field}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />

              <Grid
                container
                justifyContent={"start"}
                alignItems="center"
                sx={{ my: 1 }}
              >
                <Grid item xs={4}>
                  <Typography
                    variant="h4"
                    textAlign={"left"}
                    sx={{ color: "#aaa" }}
                  >
                    Research Topic
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: "left",
                      color: "#117DD5",
                      textTransform: "capitalize",
                    }}
                  >
                    {topic}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />

              <Grid
                container
                justifyContent={"start"}
                alignItems="center"
                sx={{ my: 1 }}
              >
                <Grid item xs={4}>
                  <Typography
                    variant="h4"
                    textAlign={"left"}
                    sx={{ color: "#aaa" }}
                  >
                    Leader Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      textAlign: "left",
                      color: "#117DD5",
                      textTransform: "capitalize",
                    }}
                  >
                    {leader}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ mb: 4 }} />

              <Heading heading="Research Guides" />

              <Grid container justifyContent={"start"} alignItems="center">
                <Grid
                  container
                  justifyContent={"start"}
                  alignItems="center"
                  sx={{ my: 1 }}
                >
                  <Grid item xs={4}>
                    <Typography
                      variant="h4"
                      textAlign={"left"}
                      sx={{ color: "#aaa" }}
                    >
                      Supervisor
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    {supervisor ? (
                      <Typography variant="h4" sx={{ color: "#117DD5" }}>
                        {supervisor}
                      </Typography>
                    ) : requestedSupervisor ? (
                      <Typography variant="h4" sx={{ color: "#E28743" }}>
                        Requested
                      </Typography>
                    ) : (
                      <RMTbtn
                        disabled={userID !== leaderID}
                        href={"/profile/supervisor-" + grp_id}
                        btn={"Request for Supervisor"}
                        handler={() => {}}
                        wd="100%"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Divider />

              <Grid container justifyContent={"start"} alignItems="center">
                <Grid
                  container
                  justifyContent={"start"}
                  alignItems="center"
                  sx={{ my: 1 }}
                >
                  <Grid item xs={4}>
                    <Typography
                      variant="h4"
                      textAlign={"left"}
                      sx={{ color: "#aaa" }}
                    >
                      Co-Supervisor
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    {coSupervisor ? (
                      <Typography variant="h4" sx={{ color: "#117DD5" }}>
                        {coSupervisor}
                      </Typography>
                    ) : requestedCoSupervisor ? (
                      <Typography variant="h4" sx={{ color: "#E28743" }}>
                        Requested
                      </Typography>
                    ) : (
                      <RMTbtn
                        disabled={userID !== leaderID}
                        href={"/profile/coSupervisor-" + grp_id}
                        btn="Request for Co-Supervisor"
                        handler={() => {}}
                        wd="100%"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Divider />

              <Grid container justifyContent={"start"} alignItems="center">
                <Grid
                  container
                  justifyContent={"start"}
                  alignItems="normal"
                  sx={{ my: 1 }}
                >
                  <Grid item xs={4}>
                    <Typography
                      variant="h4"
                      textAlign={"left"}
                      sx={{ color: "#aaa" }}
                    >
                      pannel
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    {pannel.length > 0 ? (
                      pannel.map((row, index) => {
                        return (
                          <Typography
                            key={index}
                            sx={{
                              textAlign: "left",
                              color: "#117DD5",
                              textTransform: "capitalize",
                            }}
                          >
                            {row.name}
                          </Typography>
                        );
                      })
                    ) : (
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#E28743",
                          textTransform: "capitalize",
                        }}
                      >
                        No Pannel Assigned
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ mb: 4 }} />

              <Heading heading="Group Members" />
              <Container maxWidth="sm">
                <Container maxWidth="xs">
                  <List>
                    <TransitionGroup>
                      {members ? (
                        members.map((row, index) => {
                          return (
                            <Collapse>
                              <Members key={index} data={row} />
                            </Collapse>
                          );
                        })
                      ) : (
                        <>No Members</>
                      )}
                    </TransitionGroup>
                  </List>
                </Container>
              </Container>
            </>
          )}
          {!hasGroup && isLoaded && (
            <>
              <Container maxWidth="sm">
                <TextField
                  fullWidth
                  value={name}
                  onChange={(event) => {
                    setname(event.target.value);
                  }}
                  color="info"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  id="group name"
                  label="Group name"
                  className={classes.inputs}
                  autoFocus
                  inputProps={{ className: classes.inputs }}
                />
                <TextField
                  fullWidth
                  value={research_Field}
                  onChange={(event) => {
                    setField(event.target.value);
                  }}
                  color="info"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  id="field"
                  label="Research Field"
                  className={classes.inputs}
                  inputProps={{ className: classes.inputs }}
                />
                <TextField
                  fullWidth
                  value={research_Topic}
                  onChange={(event) => {
                    setTopic(event.target.value);
                  }}
                  color="info"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  id="topic"
                  label="Research Topic"
                  className={classes.inputs}
                  inputProps={{ className: classes.inputs }}
                />
              </Container>
              <Button
                onClick={addgroup}
                sx={{ mt: 3 }}
                color="info"
                variant="contained"
                disableElevation
              >
                Create A Group
              </Button>
            </>
          )}
          {!isLoaded && (
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
        </Box>
      </Paper>
    </>
  );
}

export default OwnGroup;
